export interface RedirectWithKey extends RedirectType {
    key: string;
    index: number;
}

export interface RedirectType {
    id: string;
    source: string;
    destination: string;
    status_code: string;
    is_active: string;
}

export interface FinishedRedirectValues {
    source: string;
    destination: string;
    status_code: string;
    is_active: string;
}