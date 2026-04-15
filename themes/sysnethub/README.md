# SysNetHub Hugo Theme

Theme tối giản phong cách terminal cho [nixinfra.com](https://nixinfra.com).  
Sidebar tối · Font DM Mono + Playfair · Accent xanh lá SysNetHub.

---

## Cài đặt (3 bước)

### Bước 1 — Copy theme vào repo

```bash
# Trong repo GitHub của bạn
cp -r sysnethub-theme/  themes/sysnethub/
```

Cấu trúc repo sau khi copy:
```
your-repo/
├── themes/
│   └── sysnethub/          ← folder này
│       ├── layouts/
│       ├── static/
│       ├── archetypes/
│       └── theme.toml
├── content/
│   └── posts/
├── static/
└── hugo.toml               ← cần cập nhật
```

---

### Bước 2 — Cập nhật hugo.toml

Mở file `hugo.toml` (hoặc `config.toml`) ở root repo, thêm/sửa:

```toml
theme = "sysnethub"

[outputs]
  home = ["HTML", "RSS", "JSON"]

[params]
  description = "Your Hub for Practical, Essential Knowledge..."
  author      = "SysNetHub"
  tagline     = "Net/Sys is Fun!"
```

Xem file `hugo.toml.example` trong theme để lấy config đầy đủ.

---

### Bước 3 — Tạo bài viết đầu tiên

```bash
hugo new posts/bai-viet-dau-tien.md
```

Front matter của mỗi bài (trong file `.md`):

```yaml
---
title: "Tiêu đề bài viết"
date: 2026-04-15
author: "Tên bạn"
tags: ["devops", "lab"]
snippet: |
  $ docker compose up --build
  ✓ Starting app on :3000
---

Nội dung bài viết...
```

---

### Bước 4 — Chạy local để xem

```bash
hugo server -D
# Mở http://localhost:1313
```

---

## Tính năng tìm kiếm

Theme dùng file `/index.json` (được tạo tự động khi build) để tìm kiếm.  
Cần có dòng này trong `hugo.toml`:

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

---

## Thêm ảnh bìa

```yaml
cover: "/images/ten-anh.jpg"
```

Đặt ảnh trong `static/images/`. Nếu không có `cover`, theme tự dùng `snippet`.

---

## Cấu trúc thư mục content gợi ý

```
content/
├── posts/          ← bài viết kỹ thuật
├── about.md
├── contact.md
├── privacy.md
└── terms.md
```
