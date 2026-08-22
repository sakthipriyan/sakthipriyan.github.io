// Renders ```d2 fenced blocks as diagrams. Loaded as an ES module.
import { D2 } from 'https://esm.sh/@terrastruct/d2';

// Chroma wraps fenced blocks in <div class="highlight">; replace the outermost wrapper.
function diagramBlockRoot(codeEl) {
    return codeEl.closest('div.highlight') || codeEl.parentNode;
}

document.addEventListener('DOMContentLoaded', async function () {
    const d2Elements = document.querySelectorAll('pre code.language-d2, pre code.d2');
    if (d2Elements.length === 0) return;

    try {
        const d2 = new D2();

        // Swap every block for a placeholder up front, then render them in turn.
        const diagramTasks = Array.from(d2Elements).map(codeEl => {
            const root = diagramBlockRoot(codeEl);
            let d2Code = codeEl.textContent.replace(/&gt;/g, '>').replace(/&lt;/g, '<');

            const container = document.createElement('div');
            container.className = 'd2-diagram d2-loading';
            container.innerHTML = '<span class="spinner">⚙️</span> Rendering diagram...';
            root.parentNode.replaceChild(container, root);

            if (!d2Code.includes('d2-config')) {
                d2Code = 'vars: {\n  d2-config: {\n    layout-engine: elk\n    theme-id: 105\n  }\n}\n' + d2Code;
            }

            return { d2Code, container };
        });

        for (const task of diagramTasks) {
            try {
                const result = await d2.compile(task.d2Code);
                const svg = await d2.render(result.diagram, result.renderOptions || {});

                task.container.className = 'd2-diagram';
                task.container.innerHTML = svg;

                const svgEl = task.container.querySelector('svg');
                if (svgEl) {
                    svgEl.removeAttribute('width');
                    svgEl.removeAttribute('height');
                    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                }
            } catch (err) {
                console.error('D2 compile/render error:', err);
                task.container.className = 'd2-diagram';
                task.container.innerHTML = '<div class="chart-error">Error rendering D2 diagram: ' + (err.message || err) + '</div>';
            }
        }
    } catch (initErr) {
        console.error('D2 initialization error:', initErr);
    }
});
