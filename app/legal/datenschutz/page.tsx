export default function Datenschutz() {
    return (
        <>
            <h1>Datenschutzerklärung</h1>
            <p className="text-sm text-slate-500">Stand: Dezember 2024</p>

            <h2>1. Datenschutz auf einen Blick</h2>

            <h3>Allgemeine Hinweise</h3>
            <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
                <strong>Wer ist verantwortlich für die Datenerfassung?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
                VertragsKlar GmbH (i.G.), Musterstraße 123, 10115 Berlin.
                Kontakt: support@vertragsklar.de
            </p>

            <h2>2. Datenverarbeitung bei der Vertragsanalyse</h2>

            <h3>Verarbeitung hochgeladener Dokumente</h3>
            <p>
                Wenn Sie ein Dokument zur Analyse hochladen, wird dieses temporär auf unseren
                Servern gespeichert und durch unser <strong>Multi-KI-System</strong> mit spezialisierten
                juristischen Algorithmen verarbeitet. Dabei werden folgende Daten erhoben:
            </p>
            <ul>
                <li>Der Inhalt des hochgeladenen Dokuments</li>
                <li>Ihre E-Mail-Adresse für die Zustellung des Analyseergebnisses</li>
                <li>Zahlungsinformationen (werden direkt von Stripe verarbeitet)</li>
            </ul>

            <h3>Löschung der Dokumente</h3>
            <p>
                Hochgeladene Dokumente werden nach Abschluss der Analyse und Zustellung des
                Ergebnisses <strong>automatisch und unwiderruflich gelöscht</strong>. Die Speicherdauer
                beträgt maximal 24 Stunden. Wir speichern keine Kopien Ihrer Verträge.
            </p>

            <h3>KI-Verarbeitung</h3>
            <p>
                Die Analyse erfolgt durch mehrere spezialisierte KI-Systeme, die nach deutschen
                Rechtsstandards entwickelt wurden. Die Verarbeitung findet auf europäischen Servern
                statt. Es erfolgt keine Weitergabe Ihrer Dokumente an Dritte zu Trainingszwecken.
            </p>

            <h2>3. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul>
                <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                <li>Die Berichtigung unrichtiger Daten zu verlangen</li>
                <li>Die Löschung Ihrer Daten zu verlangen</li>
                <li>Die Einschränkung der Verarbeitung zu verlangen</li>
                <li>Der Verarbeitung zu widersprechen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
            </ul>
            <p>
                Zur Ausübung dieser Rechte wenden Sie sich bitte an: support@vertragsklar.de
            </p>

            <h2>4. Zahlungsabwicklung</h2>
            <p>
                Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe, Inc.
                Die Datenschutzbestimmungen von Stripe finden Sie unter:
                <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    https://stripe.com/de/privacy
                </a>
            </p>

            <h2>5. SSL-Verschlüsselung</h2>
            <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. Eine
                verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>

            <h2>6. Cookies</h2>
            <p>
                Unsere Website verwendet ausschließlich technisch notwendige Cookies, die für den
                Betrieb der Website erforderlich sind. Eine Einwilligung ist für diese Cookies
                nicht erforderlich.
            </p>

            <h2>7. Änderungen dieser Datenschutzerklärung</h2>
            <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den
                aktuellen rechtlichen Anforderungen anzupassen oder um Änderungen unserer
                Leistungen umzusetzen. Die neue Datenschutzerklärung gilt dann für Ihren
                nächsten Besuch.
            </p>
        </>
    );
}
