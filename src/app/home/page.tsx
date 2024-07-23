

export default async function Home() {
    return (
        <>
            <div className='font-bold text-sm text-center mx-auto mt-4'>Server Time: {new Date().toLocaleString()}</div>
        </>
    );
}
