# Maintainer: galeed <galeedx@gmail.com>
pkgname=meow-code-app
pkgver=v1.0.0
pkgrel=1
pkgdesc="Una aplicación web de desarrollo y utilidades minimalista centrada en el flujo de trabajo de código"
arch=('any')
url="https://github.com/galeed/Meow-Code-App"
license=('MIT')
depends=('bash')
source=("$pkgname-$pkgver.tar.gz::$url/archive/refs/tags/v$pkgver.tar.gz")
sha256sums=('SKIP')

package() {
    cd "$pkgname-$pkgver"
    
    # Crear el directorio de destino en el sistema (por ejemplo, /usr/share/meow-code-app)
    install -dm755 "$pkgdir/usr/share/$pkgname"
    
    # Copiar todos los archivos de la app al directorio del sistema
    cp -r * "$pkgdir/usr/share/$pkgname/"
    
    # Crear un script lanzador simbólico en /usr/bin por si deseas ejecutarlo o integrarlo con un entorno de escritorio
    install -dm755 "$pkgdir/usr/bin"
    cat << EOF > "$pkgdir/usr/bin/meow-code-app"
#!/bin/bash
xdg-open /usr/share/meow-code-app/index.html
EOF
    chmod +x "$pkgdir/usr/bin/meow-code-app"
}
