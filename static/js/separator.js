document.addEventListener('DOMContentLoaded', function() {
    // Tìm thẻ <li> của mục NOTES
    const notesItem = document.querySelector('li[data-nav-url="/notes/index.html"]');

    if (notesItem) {
        // 1. Tạo phần tử HR (đường phân cách)
        const separator = document.createElement('hr');

        // 2. Định nghĩa Style cho đường phân cách (màu trắng)
        separator.style.cssText = 'border: 0; height: 1px; background-color: white; margin: 15px 0;';

        // 3. Chèn phần tử HR ngay sau thẻ <li> của NOTES
        // Lệnh: chèn 'separator' trước phần tử tiếp theo của 'notesItem'
        notesItem.parentNode.insertBefore(separator, notesItem.nextSibling);

        // Tùy chọn: Thêm margin-top cho mục About để tạo thêm khoảng cách nếu cần
        const aboutItem = document.querySelector('li[data-nav-url="/about/index.html"]');
        if (aboutItem) {
            aboutItem.style.marginTop = '5px';
        }
    }
});
