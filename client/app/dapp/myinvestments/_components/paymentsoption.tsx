interface IProps {
    title: string;
    amount: string;
}

export function PaymentsOption({ title, amount }: IProps) {

    return (
        <div className="bg-[#14172E] flex flex-col items-center gap-2 p-6 rounded-md">            
            <p className="font-medium text-xl text-white">{title}</p>
            <p className="font-medium text-lg text-white">{amount} <span className="font-normal text-sm text-[#00c853]">/ETH</span></p>
        </div>
    );
}
