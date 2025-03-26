let images = []; // 存储所有图片
const limit = 100; // 每页 100 张
let currentPage = 0; // 当前页码（0 = 000-099，1 = 100-199 ...）
let searchQuery = ""; // 搜索关键词

// 读取 images.json
fetch("images.json")
    .then(response => response.json())
    .then(data => {
        images = data;
        createPagination(); // 生成分页按钮
        loadImages(); // 默认加载第一页
    })
    .catch(error => console.error("加载 JSON 失败:", error));

// 生成分页按钮（000-099，100-199 ...）
function createPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // 清空旧分页

    for (let i = 0; i < 10; i++) {
        const start = i * limit;
        const end = start + limit - 1;
        const button = document.createElement("button");
        button.textContent = `${start.toString().padStart(3, '0')}-${end.toString().padStart(3, '0')}`;
        button.onclick = () => changePage(i);
        pagination.appendChild(button);
    }
}

// 切换页面
function changePage(page) {
    currentPage = page;
    searchQuery = ""; // 清空搜索
    document.getElementById("searchInput").value = ""; // 清空输入框
    loadImages();
}

// 加载图片
function loadImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // 清空旧数据

    // 计算起始索引
    const startIndex = currentPage * limit;
    const endIndex = startIndex + limit;

    // 过滤符合搜索条件的图片
    const imageList = images
        .filter(img => searchQuery === "" || img.keywords.some(kw => kw.includes(searchQuery)))
        .slice(startIndex, endIndex);

    // 显示图片
    imageList.forEach(img => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-item");

        const imgElement = document.createElement("img");
        imgElement.src = img.url;
        imgElement.alt = img.text;
        imgElement.loading = "lazy";
        imgElement.style.maxWidth = "200px";  
        imgElement.style.width = "100%";      
        imageContainer.appendChild(imgElement);

        const caption = document.createElement("p");
        caption.textContent = img.text;
        caption.style.marginTop = "10px";  
        caption.style.fontSize = "16px";
        caption.style.color = "#555";
        imageContainer.appendChild(caption);

        gallery.appendChild(imageContainer);
    });
}

// 搜索功能
function searchImages() {
    searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
    currentPage = 0; // 搜索后从第一页开始
    loadImages();
}

// 禁用右键和 F12
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
    }
});

// 监听搜索输入框
document.getElementById("searchInput").addEventListener("input", searchImages);