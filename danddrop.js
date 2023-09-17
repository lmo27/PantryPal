// Initialize Interact.js
interact('.drag-item')
    .draggable({
        listeners: {
            start(event) {
                // Add any necessary code when drag starts
                console.log("Started to drag the Object")
            },
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                const originalItem = event.target;
            
                // Clone the dragged item
                const clone = originalItem.cloneNode(true);
            
                // Reset the position of the clone
                clone.style.transform = 'translate(0px, 0px)';
                clone.removeAttribute('data-x');
                clone.removeAttribute('data-y');
            
                // Append the clone to the container
                event.currentTarget.appendChild(clone);
            } 
        },
    });
   
    
