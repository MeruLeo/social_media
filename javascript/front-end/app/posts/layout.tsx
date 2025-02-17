export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="text-center justify-center flex w-full h-screen overflow-y-auto">
                {children}
            </div>
        </section>
    );
}
