# Kül Kule sitesi — Yönetim kılavuzu (BurunHane)

Site adresi: **https://davutfatih.github.io/kul-kule/**

Site GitHub Pages'te ücretsiz yayınlanır. Bu depoda (`davutfatih/kul-kule`) bir dosya değiştiğinde site 1–2 dakika içinde kendiliğinden güncellenir. Sunucu, ödeme ya da ek kurulum gerekmez.

## 1) Yönetim paneli (önerilen yol: kod bilmeden düzenleme)

1. **https://app.pagescms.org** adresine git, **Sign in with GitHub** ile `davutfatih` hesabınla giriş yap.
2. İlk girişte Pages CMS, GitHub uygulamasını kurmanı ister: **Install** de, yalnızca `kul-kule` deposunu seç.
3. Depolar listesinden **kul-kule**'yi aç → soldaki **Site İçeriği**.
4. Hikâye, kahramanlar, nasıl oynanır, kontroller, çevrim içi, yapımcı, SSS, galeri, indirme bağlantısı ve demo notu buradan düzenlenir.
   - Resim değiştirmek veya galeriye resim eklemek için resim alanına tıkla, bilgisayarından yükle.
   - **Save** dediğinde değişiklik GitHub'a kaydedilir; site 1–2 dakika içinde güncellenir.

## 2) GitHub üzerinden doğrudan düzenleme (yedek yol)

github.com/davutfatih/kul-kule → `icerik/site.json` → kalem simgesi (✏️) → düzenle → **Commit changes**.
Tırnak ve virgüllere dikkat et; JSON bozulursa site "İçerik yüklenemedi" der. Geri almak için dosyanın **History** sekmesinden eski sürüme dönebilirsin.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `icerik/site.json` | Sitedeki tüm yazılar (panelden düzenlenir) |
| `veri/oyun.json` | Kartlar, kombolar, canavarlar, kalıntılar — oyunun kendi verisinden üretilir |
| `img/` | Resimler |
| `index.html`, `stil.css`, `site.js` | Sayfa tasarımı ve kodu |
| `.pages.yml` | Yönetim panelinin ayarı |

## Yeni oyun sürümü yayınlamak

github.com/davutfatih/kul-kule → **Releases** → **Draft a new release** → parçaları (`KulKule-Demo.zip.001`, `.002` …) sürükle bırak → **Publish**.
Sitedeki indirme düğmesi her zaman en son sürüme (`/releases/latest`) gider, ayrıca değiştirmen gerekmez.
Not: GitHub dosya başına en çok 2 GB kabul eder; oyunu 7-Zip ile "Bölümlere ayır: 1900M" seçeneğiyle paketle.

## Kendi .com adresini bağlamak (isteğe bağlı, yıllık ~10 $)

1. Bir alan adı satın al (ör. Cloudflare Registrar, Porkbun, Namecheap): `kulkule.com`, `burunhane.com` gibi.
2. Alan adının DNS ayarlarına şu kayıtları ekle:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` → `www` → `davutfatih.github.io`
3. github.com/davutfatih/kul-kule → **Settings → Pages → Custom domain** kutusuna alan adını yaz → **Save** → birkaç dakika sonra **Enforce HTTPS**'i işaretle.
