// Renders ```echarts fenced blocks (and legacy .echarts-container[data-chart]) as charts.
// Chroma wraps fenced blocks in <div class="highlight">; replace the outermost wrapper.
function diagramBlockRoot(codeEl) {
    return codeEl.closest('div.highlight') || codeEl.parentNode;
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof echarts === 'undefined') return;

    document.querySelectorAll('pre code.language-echarts, pre code.echarts').forEach(codeEl => {
        try {
            const root = diagramBlockRoot(codeEl);
            const config = JSON.parse(codeEl.textContent);

            const customHeight = config.height || '500px';
            delete config.height;

            const container = document.createElement('div');
            container.className = 'echarts-container echarts-loading';
            container.style.height = customHeight;
            container.innerHTML = '<div><span class="spinner">⚙️</span> Rendering chart...</div>';
            root.parentNode.replaceChild(container, root);

            // Defer init one frame so the placeholder paints first.
            setTimeout(() => {
                container.className = 'echarts-container';
                container.innerHTML = '';
                const chart = echarts.init(container);
                chart.setOption(config);
                window.addEventListener('resize', () => chart.resize());
            }, 400);
        } catch (e) {
            console.error('ECharts code block error:', e);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chart-error';
            errorDiv.textContent = 'Error rendering ECharts diagram: ' + e.message;
            const errRoot = diagramBlockRoot(codeEl);
            errRoot.parentNode.insertBefore(errorDiv, errRoot);
        }
    });

    document.querySelectorAll('.echarts-container[data-chart]').forEach(container => {
        try {
            const chart = echarts.init(container);
            chart.setOption(JSON.parse(container.dataset.chart));
            window.addEventListener('resize', () => chart.resize());
        } catch (e) {
            console.error('ECharts config error:', e);
        }
    });
});
