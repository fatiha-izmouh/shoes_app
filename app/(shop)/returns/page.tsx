export default function ReturnsPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">Returns & Exchanges</h1>
                <p className="text-xl text-muted-foreground mb-12 text-balance">
                    Your satisfaction is our priority
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Return Policy</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            At ValkyLeather, we understand that handmade products require careful consideration. We want you to be completely satisfied with your purchase.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Since each pair of shoes is handcrafted to order based on your measurements, we cannot accept returns on custom-made items unless there is a defect in materials or workmanship.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Exchanges</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            If your shoes do not fit properly, please contact us within 14 days of receiving your order. We will work with you to find the best solution, which may include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Adjustments to the existing pair (if possible)</li>
                            <li>Creating a new pair with corrected measurements</li>
                            <li>Store credit for future purchases</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Defects & Quality Issues</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We take great pride in our craftsmanship. If you receive a product with a manufacturing defect, please contact us immediately with photos of the issue.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We will repair or replace defective items at no additional cost to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">How to Initiate a Return or Exchange</h2>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Contact us via email or through our contact form</li>
                            <li>Provide your order number and details about the issue</li>
                            <li>Include clear photos if applicable</li>
                            <li>Our team will respond within 48 hours with next steps</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-4">Contact Us</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            For any questions about returns or exchanges, please visit our{" "}
                            <a href="/contact" className="text-primary hover:underline">
                                Contact page
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
