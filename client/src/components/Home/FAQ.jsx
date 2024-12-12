const Faq = () => {
    return (
        <div className="container mx-auto my-10 space-y-5">
            <section className='p-4 border rounded-lg bg-white'>
                <h2 className='text-lg font-semibold'>What format are these icons?</h2>
                <p className='text-gray-500 font-medium'>
                    The icons are in SVG (Scalable Vector Graphic) format. They can be imported into
                    your design tool of choice and used directly in code.
                </p>
            </section>
            <section className='p-4 border rounded-lg bg-white'>
                <h2 className='text-lg font-semibold'>Can I use the icons at different sizes?</h2>
                <p className='text-gray-500 font-medium'>
                    Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to
                    different sizes as needed. We don&#39;t recommend going smaller than 20 x 20 or
                    larger than 64 x 64 to retain legibility and visual balance.
                </p>
            </section>
            <section className='p-4 border rounded-lg bg-white'>
                <h2 className='text-lg font-semibold'>
                    Do I have to add attribution to my projects?
                </h2>
                <p className='text-gray-500 font-medium'>
                    No. You are allowed to use these icons freely in your personal and professional
                    work. If you enjoy the icon pack, feel free to tell others!
                </p>
            </section>
        </div>
    );
};

export default Faq;
