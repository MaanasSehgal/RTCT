const Board = ({boardData, selectedTab} : any) => {
    return (
        <div
            className="w-full h-full bg-[#0D1117] overflow-y-auto">
            {(boardData)}
        </div>
    )
}

export default Board;