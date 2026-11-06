# Kül Kule sitesi — Yönetim kılavuzu (BurunHane)

Site adresi: **https://kulkule.web.app**

Site Google Firebase Hosting'in ücretsiz planında yayınlanır (Firebase projesi: `kulkule`, hesap: davutcetin14@gmail.com). Kaynak dosyalar GitHub'daki `davutfatih/kul-kule` deposundadır: bu depoda bir dosya değiştiğinde GitHub Actions siteyi 1–2 dakika içinde kendiliğinden Firebase'e yeniden yükler. Ödeme gerekmez.

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

## Elle yayınlama (otomatik yayın çalışmazsa)

Komut isteminde:

```
cd C:\KulKule\site
C:\KulKule\tools\node-v26.13.0-win-x64\firebase.cmd deploy --only hosting
```

Firebase panelinden (https://console.firebase.google.com/project/kulkule/hosting) eski bir sürüme tek tıkla geri dönebilirsin.

## Kendi .com adresini bağlamak (isteğe bağlı, yıllık ~10 $)

Firebase panelinde **Hosting → Add custom domain** ile satın aldığın alan adını ekle; gösterdiği DNS kayıtlarını alan adı sağlayıcına gir.
