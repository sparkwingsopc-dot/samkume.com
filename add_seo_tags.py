import glob
import re

html_files = glob.glob("*.html")

ga_snippet = """
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-XXXXXXXXXX');
    </script>
"""

schema_snippet_en = """
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Samku International",
      "url": "https://samkume.com",
      "logo": "https://samkume.com/logo-new.png",
      "description": "Samku International is a trusted ISO-certified company specializing in engineering, facility support, and environmental solutions across Saudi Arabia. We are committed to delivering excellence, safety, and sustainable services that align with Saudi Vision 2030.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SA"
      }
    }
    </script>
"""

schema_snippet_ar = """
    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "سامكو العالمية",
      "url": "https://samkume.com",
      "logo": "https://samkume.com/logo-new.png",
      "description": "شركة سامكو العالمية هي شركة موثوقة وحاصلة على شهادة الأيزو متخصصة في حلول الهندسة ودعم المرافق والبيئة في جميع أنحاء المملكة العربية السعودية. نحن ملتزمون بتقديم خدمات متميزة وآمنة ومستدامة تتماشى مع رؤية السعودية 2030.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "SA"
      }
    }
    </script>
"""

for file in html_files:
    is_ar = file.endswith('-ar.html')
    schema = schema_snippet_ar if is_ar else schema_snippet_en
    
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Avoid injecting multiple times
    if "gtag.js" not in content and "application/ld+json" not in content:
        # Inject just before </head>
        new_content = content.replace("</head>", f"{ga_snippet}{schema}</head>")
        
        with open(file, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {file}")

print("Injection complete.")
