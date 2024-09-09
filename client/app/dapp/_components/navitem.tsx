import Link from "next/link";
import { Category, Additem, Notepad2, StatusUp, HomeHashtag, Judge, Crown, ArrangeHorizontal, GalleryImport, Diamonds, Coin1, I24Support } from "iconsax-react";

interface IProps {
    itemTitle: string;
    isActive: boolean;
    onClick: () => void;
}

interface ItemLink {
    [key: string]: string;
}

const icons: { [key: string]: React.ElementType } = {
    "Dashboard": Category,
    "ICO Claim": Coin1,
    "Support Center": I24Support,
    "List New Asset": Additem,
    "My Assets/Loans": Notepad2,
    "Marketplace": HomeHashtag,
    "My Investments": StatusUp,
    "Distressed Assets": Judge,
    "Transactions": ArrangeHorizontal,
    "Asset Request Form": GalleryImport,
    "Underwriting": Crown,
    "Super Admin": Diamonds,
};

export function NavItem({ itemTitle, isActive, onClick }: IProps) {      

    const itemLinks: ItemLink = {
        "Dashboard": "dashboard",
        "ICO Claim": 'icoclaim',
        "Support Center": 'supportcenter',
        "List New Asset": "listnewasset",
        "My Assets/Loans": "myassetsandloans",    
        "Marketplace": "marketplace",
        "My Investments": "myinvestments",
        "Distressed Assets": "distressedassets",
        "Transactions": "transactions",
        "Asset Request Form": "assetrequestform",
        "Underwriting": "underwriting",
        "Super Admin": "superadmin",
    };

    const enabledItems = ["Dashboard", "ICO Claim", "Support Center", "Asset Request Form", "Underwriting", "Super Admin"];
    const isDisabled = !enabledItems.includes(itemTitle);
    const Icon = icons[itemTitle];

    return (
        <Link href={isDisabled ? "#" : `/dapp/${itemLinks[itemTitle]}`}>
            <div
                onClick={isDisabled ? undefined : onClick}
                className={`w-[250px] flex items-center px-4 py-2 cursor-pointer ${
                    isActive && !isDisabled ? "transition-colors duration-300 ease-in-out bg-[#2196f30f] hover:bg-[#2195f31f] border-r-2 border-[#2196f3]" : ""
                } ${isDisabled ? "cursor-not-allowed" : ""}`}
            >
                <Icon size="24" color={`${isActive && !isDisabled ? "#2196f3" : isDisabled ? "#999999" : "#ffffff"}`} />
                <p className={`text-sm ml-3 ${isActive && !isDisabled ? "text-[#2196f3]" : isDisabled ? "text-gray-400" : "text-white"}`}>
                    {itemTitle}
                </p>
            </div>
        </Link>    
    )
}
