# Maintainer: galeed <galeed@archlinux.local>
pkgname=meow-code-app-git
pkgver=1.0.0
pkgrel=1
pkgdesc="Editor de coodigo html"
arch=('any')
url="https://github.com/galeed/Meow-Code-App"
license=('MIT')
depends=('electron')
makedepends=('git' 'npm')
source=("git+$url.git")
sha256sums=('SKIP')



pkgver() {
  cd "$srcdir/Meow-Code-App"
  printf "r%s.%s" "$(git rev-list --count HEAD)" "$(git rev-parse --short HEAD)"
}

build() {
  cd "$srcdir/Meow-Code-App"

  true
}

package() {
  cd "$srcdir/Meow-Code-App"


  install -d "$pkgdir/usr/share/meow-code-app"
  cp -r * "$pkgdir/usr/share/meow-code-app/"


  install -d "$pkgdir/usr/bin"
  cat <<EOF > "$pkgdir/usr/bin/meow-code-app"
#!/bin/bash
exec electron /usr/share/meow-code-app/main.js "\$@"
EOF
  chmod +x "$pkgdir/usr/bin/meow-code-app"

  
  install -d "$pkgdir/usr/share/applications"
  cat <<EOF > "$pkgdir/usr/share/applications/meow-code-app.desktop"
[Desktop Entry]
Name=Meow Code App
Comment=Editor de coodigo html
Exec=meow-code-app %U
Terminal=false
Type=Application
Icon=meow-code-app
Categories=HTML;CODE;DEVELOPER;
EOF


  install -d "$pkgdir/usr/share/pixmaps"
  if [ -f "icon-512.png" ]; then
    cp icon-512.png "$pkgdir/usr/share/pixmaps/meow-code-app.png"
  fi
}
