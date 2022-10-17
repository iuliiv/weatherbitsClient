export interface CRUD {
    list: () => Promise<any>;
    create: (resource: any) => Promise<any>;
    find: (id: number) => Promise<any>;
}