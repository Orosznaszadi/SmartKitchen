export default function Contact() {
    return (
        <div className="flex">

            <div className="flex-1 p-6 max-w-7xl mx-auto space-y-12">
                <h1 className="text-3xl font-bold">Kapcsolat</h1>


                <div className="space-y-2 text-lg">
                    <p><strong>Cím:</strong> 1234 Budapest, Kóstoló utca 7.</p>
                    <p><strong>Telefon:</strong> +36 1 234 5678</p>
                    <p><strong>E-mail:</strong> <a href="mailto:info@smartkitchen.hu" className="text-blue-600 hover:underline">info@smartkitchen.hu</a></p>
                    <p><strong>Nyitvatartás:</strong></p>
                    <ul className="ml-4 list-disc">
                        <li>Hétfő – Péntek: 11:00 – 22:00</li>
                        <li>Szombat – Vasárnap: 12:00 – 23:00</li>
                    </ul>
                </div>

                <div className="pt-4 border-t">
                    <p className="text-lg"><strong>Kövess minket:</strong></p>
                    <ul className="flex space-x-4 mt-2">
                        <li><a href="https://facebook.com/smartkitchenhu" className="text-blue-700 hover:underline" target="_blank">Facebook</a></li>
                        <li><a href="https://instagram.com/smartkitchenhu" className="text-pink-500 hover:underline" target="_blank">Instagram</a></li>
                    </ul>
                </div>

            </div>
            <div className="w-80 bg-white-100 p-6  ">
                <img src="image.png" alt="" className="rounded-2xl shadow-md "/>
            </div>
        </div>
    );
}
