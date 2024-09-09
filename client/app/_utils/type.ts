export interface User {
  _id: string;
  email: string;
  name: string;
  firstname: string;
  lastname: string;
  dob: string;
  nationality: string;
  twofa: boolean;
  phoneNumber: string;
  address1 : string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  registrationdate: string;
  logindate: string;  
  nft: {
    awaiting: number;
    approved: number;
    listed: number;
  };
  bid: {
    active: number;
    accepted: number;
  };
  roi: number;
  coltwallet: string;
  colttoken: number;
}

export interface Attribute {
    trait_type: string;
    value: string;
}
  
export interface Nft {
    _id: string;
    email: string;
    name: string;
    tokenid: string;
    tokenaddress: string;
    collectionname: string;
    metadata: {
      name: string;
      description: string;
      animation_url: string;
      attributes: Attribute[];
    };
    estimatedassetvalue: string;
    loanamount: string;
    loantermmonth: string;
    loanrate: string;
    stage: number;
    amend: string;
}

export interface Ico {
  _id: string;
  email: string;
  name: string;
  walletaddress: string;
  totaltoken: number;
  purchasedtoken: number;
  purchasedtx1: string;
  purchasedtx2: string;
  bonustoken: number;
  bonustx: string; 
  distributiontx: string;
  distributiontoken: number;
  claimedtx: string;
  date: string;
}

export interface Bid {
  _id: string;
  email: string;
  name: string;
  tokenid: string;
  tokenaddress: string;  
  bidemail: string;
  bidname: string;
  bidamount: string;
  bidrate: string;
  bidtermmonth: string;
  accepted: boolean;
  date: string;
}

export interface Collection {
  _id: string;
  email: string;
  name: string;
  collectionname: string;
  marketplacelink: string;  
  sociallink: string;
  assetlink: string;
  allowed: number;
  date: string;
}

export interface Message {
  _id: string;
  email: string;
  name: string;
  title: string;
  message: string;
  date: string;
}