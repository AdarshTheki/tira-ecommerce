const Licenses = () => {
    return (
        <>
            <section className='border p-4 rounded-lg'>
                <h2 className='text-xl font-semibold text-gray-800'>Overview</h2>
                <p>
                    For personal and professional use. You cannot resell or redistribute these icons
                    in their original or modified state.
                </p>
                <ul className='list-outside list-disc pl-5'>
                    <li>You are allowed to use the icons in unlimited projects.</li>
                    <li>Attribution is not required to use the icons.</li>
                </ul>
            </section>
            <section className='border p-4 rounded-lg'>
                <h2 className='text-lg font-semibold text-gray-700'>What you can do with it</h2>
                <ul className='list-outside list-disc pl-5'>
                    <li>Use them freely in your personal and professional work.</li>
                    <li>Make them your own. Change the colors to suit your project or brand.</li>
                </ul>
            </section>
            <section className='border p-4 rounded-lg'>
                <h2 className='text-lg font-semibold text-gray-700'>What you cant do with it</h2>
                <ul className='list-outside list-disc pl-5'>
                    <li>
                        Don&#39;t be greedy. Selling or distributing these icons in their original
                        or modified state is prohibited.
                    </li>
                    <li>
                        Don&#39;t be evil. These icons cannot be used on websites or applications
                        that promote illegal or immoral beliefs or activities.
                    </li>
                </ul>
            </section>
        </>
    );
};
export default Licenses;
