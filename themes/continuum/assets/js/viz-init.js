// Renders ```dot fenced blocks as Graphviz SVG. Requires viz.js + full.render.js.
// Chroma wraps fenced blocks in <div class="highlight">; replace the outermost wrapper.
function diagramBlockRoot(codeEl) {
    return codeEl.closest('div.highlight') || codeEl.parentNode;
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('pre code.language-dot, pre code.dot').forEach(codeEl => {
        const dotCode = codeEl.textContent.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
        const viz = new Viz();
        viz.renderSVGElement(dotCode)
            .then(svg => {
                svg.removeAttribute('width');
                svg.removeAttribute('height');
                svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

                const container = document.createElement('div');
                container.className = 'graphviz-diagram';
                container.appendChild(svg);

                const root = diagramBlockRoot(codeEl);
                root.parentNode.replaceChild(container, root);
            })
            .catch(err => {
                console.error('Viz.js render error:', err);
                codeEl.parentNode.textContent = 'Error rendering diagram: ' + err;
            });
    });
});
