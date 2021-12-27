export interface Record {
    title: string,
    division: string,
    project_owner: string,
    budget: number,
    status: string,
    created: string,
    modified: string
}

export interface ShowRecord {
    title: Set<string>,
    division: Set<string>,
    project_owner: Set<string>,
    budget: { from: number, to: number },
    status: Set<string>,
    created: { from: Date, to: Date },
    modified: { from: Date, to: Date }
}
