export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">Privacy Policy</h1>
                <p className="text-xl text-muted-foreground mb-12 text-balance">
                    Last updated: December 20, 2025
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Introduction</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            At ValkyLeather, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Information We Collect</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Name and contact information (email, phone number, shipping address)</li>
                            <li>Payment information (processed securely through our payment provider)</li>
                            <li>Foot measurements and sizing preferences</li>
                            <li>Order history and preferences</li>
                            <li>Communications with our customer service team</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">How We Use Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Process and fulfill your orders</li>
                            <li>Create custom-fitted shoes based on your measurements</li>
                            <li>Communicate with you about your orders and our products</li>
                            <li>Improve our products and services</li>
                            <li>Send you marketing communications (only with your consent)</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Data Security</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment information is processed through secure, PCI-compliant payment gateways and is never stored on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Sharing Your Information</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We do not sell or rent your personal information to third parties. We may share your information with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Shipping carriers to deliver your orders</li>
                            <li>Payment processors to handle transactions</li>
                            <li>Service providers who assist in operating our website</li>
                            <li>Law enforcement or regulatory authorities when required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Cookies and Tracking</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Your Rights</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Object to processing of your personal information</li>
                            <li>Request data portability</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Data Retention</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order and measurement data may be retained to facilitate future purchases and warranty claims.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Children's Privacy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">International Data Transfers</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            As we serve customers worldwide, your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Changes to This Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If you have any questions about this Privacy Policy or how we handle your personal information, please{" "}
                            <a href="/contact" className="text-primary hover:underline">
                                contact us
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
