# Lines of code inversely proportional to readability
## Always code less to make it easily readable.
code, java, optimization, code less

### How not to code?

Few years back, I came across following method in a legacy application.  
Method consists of 18 lines of code to determine, if boolean is enabled or not for the given object.

	public boolean isEnabled(Object obj) {
		boolean disable = false;
		try {
			String someValue = getSomeValue(obj);
			if(someValue != null) {
				if(someValue.equalsIgnoreCase("T")){
					disable = true;
				} else {
					disable = false;
				}
			} else {
				disable = false;
			}
		} catch(SomeException e){
			disable = false;
		}
		return disable;
	}



### How to improve it ?

After simplication of the logic, it can be rewritten as follows,

	public boolean isEnabled(Object obj) {
		try {
			if("T".equalsIgnoreCase(getSomeValue(obj))){
				return true;
			}
		} catch(SomeException e) {}
		return false;
	}

Now, it is just 8 lines, doing exactly the same thing. Say, **55%** code is unwanted.
This code is more readable and as well, it is more efficient. 

### Notes
* `"T".equals(obj)` will return false if `obj==null` 
* Lesser lines more readable and easy to maintain in long run.
* Also, it will be relatively faster to compile and run if the code base reduces by 55%.
* **More is less**, always try to reduce the number of lines of code.
* In both the cases, apparently `SomeException e` is not handled properly.
* Either `getSomeValue` is needlessly throwing an exception or it is not properly handled or behaviour is just fine, in this business case.
* Explicitly thrown exception are usually hidden and default values are used.
* So, it will be better to return `null` or default value, in case of exception.
