---
type: blogs
title: "Uber Binary Pattern in Go: One Binary to Rule Them All"
date: "2026-01-10"
draft: false
summary: "How using a single uber binary with symbolic links can reduce container image size, build infrastructure costs, and initialization time in Go applications."
systems_tags:
  - go
  - optimization
  - docker
  - cloud
  - design
---

## The Problem

In modern cloud-native applications, we often build multiple binaries for different services or commands. Each binary needs to be:
- Built separately
- Stored in the container image
- Loaded into memory at initialization

This leads to:
- **Larger container images** — multiple binaries consuming storage
- **Higher build infrastructure costs** — building and storing multiple artifacts
- **Increased initialization time** — each binary loading its dependencies separately
- **Greater storage costs** — duplicated dependencies across binaries

## The Solution: Uber Binary Pattern

The uber binary pattern consolidates multiple command-line tools or services into a single binary. The actual command executed is determined by the name used to invoke the binary.

### How It Works

Instead of building separate binaries:
```
/bin/foo      # 10 MB
/bin/bar      # 12 MB
/bin/baz      # 11 MB
Total: 33 MB
```

You build one uber binary with symbolic links:
```
/bin/uber-binary    # 15 MB (shared code optimized)
/bin/foo -> uber-binary  (symlink)
/bin/bar -> uber-binary  (symlink)
/bin/baz -> uber-binary  (symlink)
Total: 15 MB
```

The uber binary detects which command was invoked by checking `os.Args[0]` (the program name) and routes to the appropriate logic.

## Implementation in Go

### Basic Structure

```go
package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func main() {
    // Get the name used to invoke this binary
    invokeName := filepath.Base(os.Args[0])
    
    // Route to the appropriate command
    switch invokeName {
    case "foo":
        runFoo(os.Args[1:])
    case "bar":
        runBar(os.Args[1:])
    case "baz":
        runBaz(os.Args[1:])
    case "uber-binary":
        // Direct invocation - show help or run default
        showHelp()
    default:
        fmt.Fprintf(os.Stderr, "Unknown command: %s\n", invokeName)
        os.Exit(1)
    }
}

func runFoo(args []string) {
    fmt.Println("Running foo command with args:", args)
    // Foo implementation
}

func runBar(args []string) {
    fmt.Println("Running bar command with args:", args)
    // Bar implementation
}

func runBaz(args []string) {
    fmt.Println("Running baz command with args:", args)
    // Baz implementation
}

func showHelp() {
    fmt.Println("Usage: create symlinks named foo, bar, or baz pointing to this binary")
}
```

### Building and Setting Up Symlinks

```bash
# Build the uber binary
go build -o uber-binary main.go

# Create symbolic links
ln -s uber-binary foo
ln -s uber-binary bar
ln -s uber-binary baz

# Test the commands
./foo arg1 arg2    # Invokes runFoo
./bar arg3         # Invokes runBar
./baz             # Invokes runBaz
```

### Dockerfile Example

```dockerfile
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .

# Build the uber binary
RUN go build -o uber-binary main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /app

# Copy the single binary
COPY --from=builder /app/uber-binary /usr/local/bin/uber-binary

# Create symbolic links
RUN ln -s /usr/local/bin/uber-binary /usr/local/bin/foo && \
    ln -s /usr/local/bin/uber-binary /usr/local/bin/bar && \
    ln -s /usr/local/bin/uber-binary /usr/local/bin/baz

# Can run any of the commands
CMD ["foo"]
```

## Advanced Pattern with cobra-cli

For more complex CLI applications, you can combine this pattern with popular libraries like `cobra`:

```go
package main

import (
    "os"
    "path/filepath"
    
    "github.com/spf13/cobra"
)

func main() {
    invokeName := filepath.Base(os.Args[0])
    
    var rootCmd *cobra.Command
    
    switch invokeName {
    case "foo":
        rootCmd = newFooCmd()
    case "bar":
        rootCmd = newBarCmd()
    case "baz":
        rootCmd = newBazCmd()
    default:
        rootCmd = newRootCmd()
    }
    
    if err := rootCmd.Execute(); err != nil {
        os.Exit(1)
    }
}

func newFooCmd() *cobra.Command {
    return &cobra.Command{
        Use:   "foo",
        Short: "Foo command",
        Run: func(cmd *cobra.Command, args []string) {
            // Foo logic
        },
    }
}

func newBarCmd() *cobra.Command {
    return &cobra.Command{
        Use:   "bar",
        Short: "Bar command",
        Run: func(cmd *cobra.Command, args []string) {
            // Bar logic
        },
    }
}

func newBazCmd() *cobra.Command {
    return &cobra.Command{
        Use:   "baz",
        Short: "Baz command",
        Run: func(cmd *cobra.Command, args []string) {
            // Baz logic
        },
    }
}

func newRootCmd() *cobra.Command {
    return &cobra.Command{
        Use:   "uber-binary",
        Short: "Multi-command uber binary",
    }
}
```

## Benefits

### 1. Reduced Container Image Size
- Shared code compiled once instead of duplicated across binaries
- Only one binary stored; symlinks are negligible in size
- Typical savings: 40-60% reduction in total binary size

### 2. Lower Build Infrastructure Costs
- Build pipeline compiles once instead of N times
- Less storage for build artifacts
- Faster CI/CD pipelines

### 3. Faster Initialization
- Shared libraries loaded once
- Better CPU cache utilization
- Reduced memory footprint when multiple commands run on same system

### 4. Simplified Distribution
- Single artifact to version and distribute
- Easier to ensure all commands are in sync
- Simplified deployment scripts

## Trade-offs

### When to Use
- Multiple related commands sharing significant code
- Container-based deployments where size matters
- Build time and infrastructure costs are concerns
- Commands are part of the same logical toolset

### When NOT to Use
- Completely independent tools with no shared code
- Security concerns requiring process isolation
- Need for independent versioning of different commands
- Commands have vastly different dependencies

## Real-World Examples

This pattern is used by several popular tools:

- **BusyBox**: Unix utilities combined into a single binary
- **Git**: Many git commands are symlinks to the same binary
- **Docker**: Various docker CLI tools use this pattern
- **Kubernetes**: kubectl plugins can use this approach

## Measuring the Impact

Before (separate binaries):
```bash
$ du -h foo bar baz
10M    foo
12M    bar
11M    baz
Total: 33M
```

After (uber binary):
```bash
$ du -h uber-binary
15M    uber-binary

$ ls -lh foo bar baz
lrwxr-xr-x  foo -> uber-binary
lrwxr-xr-x  bar -> uber-binary
lrwxr-xr-x  baz -> uber-binary
Total: 15M (54% reduction)
```

Container image comparison:
```
Before: 145 MB (base + 3 binaries)
After:  92 MB (base + 1 binary)
Savings: 37% smaller image
```

## Best Practices

1. **Clear naming convention**: Use descriptive symlink names that clearly indicate functionality

2. **Consistent error handling**: Ensure all commands follow the same error handling patterns

3. **Logging and monitoring**: Log which command was invoked for debugging

4. **Documentation**: Clearly document which symlinks should be created

5. **Testing**: Test each invocation path independently

6. **Versioning**: Include version information accessible from all command paths

## Conclusion

The uber binary pattern is a powerful optimization technique for Go applications, especially in containerized environments. By consolidating multiple binaries into one with symbolic links, you can achieve significant reductions in:
- Container image size (40-60%)
- Build infrastructure costs
- Initialization time
- Storage costs

The implementation is straightforward in Go using `os.Args[0]` to detect the invocation name, and the pattern scales well with CLI frameworks like Cobra. Consider this pattern when building related command-line tools or microservices that share common code.

The key is finding the right balance — use it when tools are related and share code, but keep them separate when they need true independence.
