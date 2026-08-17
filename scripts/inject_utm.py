from pathlib import Path

path = Path("index.html")
text = path.read_text(encoding="utf-8")
marker = "<!-- UTMIFY_PASSTHROUGH_V1 -->"

if marker in text:
    print("UTM passthrough already present; no change needed.")
    raise SystemExit(0)

block = r'''

<!-- UTMIFY_PASSTHROUGH_V1 -->
<script>
(function () {
    var params = new URLSearchParams(window.location.search);
    if (!params.toString()) return;

    var commonTrackingKeys = ['fbclid', 'gclid', 'ttclid', 'kwai_click_id', 'src', 'sck', 'xcod'];

    document.querySelectorAll('a[href*="pay.hotmart.com"]').forEach(function (link) {
        try {
            var checkoutUrl = new URL(link.href, window.location.href);

            params.forEach(function (value, key) {
                if (key.indexOf('utm_') === 0 || commonTrackingKeys.indexOf(key) !== -1) {
                    checkoutUrl.searchParams.set(key, value);
                }
            });

            link.href = checkoutUrl.toString();
        } catch (e) {
            console.warn('No fue posible preservar los parámetros de seguimiento.', e);
        }
    });
})();
</script>
'''

if "</body>" not in text:
    raise RuntimeError("Could not find </body> in index.html")

text = text.replace("</body>", block + "\n</body>", 1)
path.write_text(text, encoding="utf-8")
print("UTM passthrough injected successfully.")
