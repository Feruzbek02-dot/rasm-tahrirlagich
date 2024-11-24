const imageInput = document.getElementById('imageInput');
        const selectedImage = document.getElementById('selectedImage');
        const brightness = document.getElementById('brightness');
        const contrast = document.getElementById('contrast');
        const saturation = document.getElementById('saturation');
        const quality = document.getElementById('quality');
        const downloadBtn = document.getElementById('downloadBtn');

        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    selectedImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        const applyFilters = () => {
            selectedImage.style.filter = `
                brightness(${brightness.value}%)
                contrast(${contrast.value}%)
                saturate(${saturation.value}%)
            `;
        };

        brightness.addEventListener('input', applyFilters);
        contrast.addEventListener('input', applyFilters);
        saturation.addEventListener('input', applyFilters);

        downloadBtn.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = selectedImage.naturalWidth;
            canvas.height = selectedImage.naturalHeight;

            ctx.filter = `
                brightness(${brightness.value}%)
                contrast(${contrast.value}%)
                saturate(${saturation.value}%)
            `;
            ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'edited-image.jpg';
                link.click();
            }, 'image/jpeg', quality.value / 100);
        });