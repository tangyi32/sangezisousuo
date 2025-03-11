// 图片数据，包含 URL 和关键词

let images = [];

// 读取 images.json 文件
fetch("images.json")
    .then(response => response.json()) // 解析 JSON
    .then(data => {
        images = data;
        displayImages(images); // 显示图片
    })
    .catch(error => console.error("加载 JSON 失败:", error));


// 显示图片
function displayImages(imageList) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = ""; // 清空当前的图片展示

    imageList.forEach(img => {
        const imgElement = document.createElement("img");
        imgElement.src = img.url;
        imgElement.classList.add("image-item");
        gallery.appendChild(imgElement);
    });
}

// 搜索图片
function searchImages() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    // 过滤符合关键词的图片
    const filteredImages = images.filter(img => 
        img.keywords.some(kw => kw.includes(query))
    );

    // 显示匹配的图片
    displayImages(filteredImages);
}

// 页面加载时显示所有图片
document.addEventListener("DOMContentLoaded", () => {
    displayImages(images);
    
    // 监听输入框的变化，实时搜索
    document.getElementById("searchInput").addEventListener("input", searchImages);
});
