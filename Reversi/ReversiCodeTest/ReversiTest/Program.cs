// See https://aka.ms/new-console-template for more information
using System.Drawing;
using System.Numerics;

Console.WriteLine("Hello, World!");
Side[,] board; // [row][col]. current board

//public GameObject _piece;
//private GameObject[,] _pieceObject;
Side currentPlayer;

// Start is called before the first frame update

    currentPlayer = Side.White;

    // initialize start board
    board = new Side[8, 8];
    for (int i = 0; i < 8; i++)
    {
        for (int j = 0; j < 8; j++)
        {
            board[i, j] = Side.Empty;
        /*if ((i == 1 && j == 3) || (i == 1 && j == 4))
        {
            board[i, j] = Side.Black;
        }
        else if ((i == 2 && j == 3) || (i == 2 && j == 4))
        {
            board[i, j] = Side.White;
        }*/
        if ((i == 3 && j == 3) || (i == 4 && j == 4))
        {
            board[i, j] = Side.Black;
        }
        else if ((i == 4 && j == 3) || (i == 3 && j == 4))
        {
            board[i, j] = Side.White;
        }
    }
    }

/*
_pieceObject = new GameObject[8, 8];

_pieceObject[0, 0] = GameObject.Instantiate(_piece);
Transform transform = _pieceObject[0, 0].transform;
transform.position = new Vector3(1, 1, 1);
transform.rotation = Quaternion.Euler(0, 0, -180);
*/
// initialize objects

//_pieceObject = new GameObject[8, 8];
//_piece = Resources.Load<GameObject>("Assets/Objects/Model_Piece.fbx");
//_piece = GameObject.CreatePrimitive(PrimitiveType.Cube);
//Transform[,] transforms = new Transform[8, 8];






//if (currentPlayer == Side.White)
//{
//MiniMax miniMax = new MiniMax();
/*MiniMaxNode treeOrigin = new MiniMaxNode(board, currentPlayer);
MiniMax.minimax(treeOrigin, 2, currentPlayer, true);
MiniMaxNode bestChild = treeOrigin.children[0];
Console.WriteLine(bestChild.heuristic);
bestChild.printBoard();
for (int i = 1; i < treeOrigin.children.Count; i++)
{
    Console.WriteLine(treeOrigin.children[i].heuristic);
treeOrigin.children[i].printBoard();
    if (bestChild.heuristic < treeOrigin.children[i].heuristic)
    {
        bestChild = treeOrigin.children[i];
    }
}
Console.WriteLine("best heuristic: " + bestChild.heuristic);
Console.WriteLine("root heuristic: " + treeOrigin.heuristic);
board = MiniMax.copyBoard(bestChild.board);
currentPlayer = Side.Black;
Console.WriteLine("heuristic: " + treeOrigin.heuristic);
treeOrigin.printBoard();
Console.WriteLine("heuristic1: " + treeOrigin.children[0].heuristic);
treeOrigin.children[0].printBoard();
Console.WriteLine("heuristic2: " + treeOrigin.children[0].children[0].heuristic);
treeOrigin.children[0].children[0].printBoard();
Console.WriteLine("heuristic3: " + treeOrigin.children[0].children[0].children[0].heuristic);
treeOrigin.children[0].children[0].children[0].printBoard();
Console.WriteLine("heuristic4: " + treeOrigin.children[0].children[0].children[0].children[0].heuristic);
treeOrigin.children[0].children[0].children[0].children[0].printBoard();*/
//}
MiniMaxNode treeOrigin = new MiniMaxNode(board, currentPlayer);
MiniMax.minimax(treeOrigin, 3, currentPlayer, true);
Console.WriteLine(treeOrigin.heuristic);
for (int i = 0; i < treeOrigin.children.Count; i++)
{
    Console.WriteLine("1: " + treeOrigin.children[i].heuristic);
    treeOrigin.children[i].printBoard();
}
for (int i = 0; i < treeOrigin.children[0].children.Count; i++)
{
    Console.WriteLine("2: " + treeOrigin.children[0].children[i].heuristic);
    treeOrigin.children[0].children[i].printBoard();
    
}
for (int i = 0; i < treeOrigin.children[0].children[0].children.Count; i++)
{
    Console.WriteLine("3: " + treeOrigin.children[0].children[0].children[i].heuristic);
    treeOrigin.children[0].children[0].children[i].printBoard();

}

/*
MiniMaxNode treeOrigin = new MiniMaxNode(board, Side.White);

board = treeOrigin.board;
Side[,] newboard = MiniMax.copyBoard(board);
newboard[1, 1] = Side.Black;
treeOrigin.giveChild(new MiniMaxNode(newboard, Side.Black, treeOrigin));
board = MiniMax.copyBoard(treeOrigin.children[0].board);
int numChildNodes = MiniMax.numPossibleMoves(treeOrigin.board, Side.White);
Console.WriteLine(numChildNodes);*/

//board[1, 1] = Side.Black;
