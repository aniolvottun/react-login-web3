const getMessage = (): string => {
    return "Message to sign is coming from service";
}

const verifyMessage = (signature: string): boolean => {
    return true;
}


export const CoreService = {
	getMessage,
    verifyMessage
};