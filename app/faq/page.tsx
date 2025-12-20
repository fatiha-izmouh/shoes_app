export default function FAQPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">
                    Frequently Asked Questions
                </h1>
                <p className="text-xl text-muted-foreground mb-12 text-balance">
                    Everything you need to know about our handmade leather shoes
                </p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">What materials do you use?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use only natural leather, including cow, goat, and sheep leather. Each type is carefully selected for its specific qualities - comfort, durability, and flexibility. All our leather is vegetable-tanned when possible, ensuring both quality and environmental responsibility.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">How long does it take to make a pair?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Since each pair is handmade to order, production typically takes 3-4 weeks. This timeframe allows us to carefully craft your shoes with attention to every detail. During busy periods, this may extend slightly, and we'll always keep you informed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">Do you ship internationally?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Yes! We offer worldwide shipping. Shipping costs and delivery times vary by location. International orders typically arrive within 1-3 weeks after production is complete, depending on your country and customs processing.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">How do I measure my feet?</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            We provide a detailed measurement guide with every order. For the best fit, we recommend:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Measuring your feet in the evening when they're slightly larger</li>
                            <li>Standing while measuring for accurate weight distribution</li>
                            <li>Measuring both feet as they may differ slightly</li>
                            <li>Following our step-by-step guide or using our custom measurement tool on product pages</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">Can I customize my shoes?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Absolutely! We offer customization options including leather type, color, and specific design modifications. Contact us before placing your order to discuss your ideas, and we'll work with you to create something unique.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">How should I care for my leather shoes?</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Proper care will ensure your shoes last for years:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Clean with a soft, damp cloth after each wear</li>
                            <li>Apply leather conditioner every few months</li>
                            <li>Allow shoes to air dry naturally - never use direct heat</li>
                            <li>Store in a cool, dry place away from direct sunlight</li>
                            <li>Use shoe trees to maintain shape when not wearing</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">Are your shoes suitable for LARP and festivals?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Yes! Many of our designs are inspired by traditional leatherworking and are perfect for LARP events, medieval festivals, and outdoor activities. They combine authentic historical aesthetics with modern comfort and durability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">What if my shoes don't fit?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            If your custom-made shoes don't fit properly, please contact us within 14 days of receiving them. We'll work with you to find the best solution, which may include adjustments or creating a new pair with corrected measurements. See our{" "}
                            <a href="/returns" className="text-primary hover:underline">
                                Returns page
                            </a>{" "}
                            for more details.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">Do you have a physical workshop I can visit?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We are a small family workshop. While we don't have regular visiting hours, we're happy to arrange appointments for local customers who want to see our process or discuss custom orders in person. Please contact us to schedule a visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-light mb-3">Still have questions?</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We're here to help! Visit our{" "}
                            <a href="/contact" className="text-primary hover:underline">
                                Contact page
                            </a>{" "}
                            to get in touch with us directly.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
