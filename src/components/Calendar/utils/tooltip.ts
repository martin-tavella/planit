const tooltipStyles = {
    position: 'absolute' as const,
    background: 'linear-gradient(90deg, #1d0c37 0%, #2a1548 100%)',
    border: '1px solid black',
    color: '#a98af7',
    borderRadius: '8px',
    padding: '8px',
    zIndex: '1000' as const,
}
const tooltip  = document.createElement('div');
tooltip.id = 'tooltip';
Object.assign(tooltip.style, tooltipStyles);

const moveTooltip = (e: MouseEvent) => {
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
}

export default { tooltip, moveTooltip };
