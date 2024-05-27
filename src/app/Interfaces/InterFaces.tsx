export interface todoProps {
    todoTitle: string;
    todoDescription: string ;
    status: string;
    index: number;
    handleComplete: completeHandler;
    handleEdit : completeHandler;
    handleDelete : handleDelete
}

export interface completeHandler { (e: React.MouseEvent, index: number): void }

export interface handleDelete { (index:number ) : void }

export interface todoObject {
    title: string,
    status: string, 
    description : string 
}