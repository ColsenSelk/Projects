using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;
using Unity.VisualScripting;
using UnityEditor.Experimental.GraphView;
using UnityEngine;
using UnityEngine.UI;

public class GameBoard : MonoBehaviour
{
    /*enum Side
    {
        Empty,
        Black,
        White
    }*/
    Side[,] board; // [row][col]. current board

    public GameObject _piece;
    private GameObject[,] _pieceObject;
    public Side currentPlayer;
    private int win;
    private int difficulty;
    private bool finishedConfiguration;

    //private int playerMoveIndex;

    public Side currentTeam;
    public GameObject _whiteButton;
    public GameObject _blackButton;

    public GameObject _hardButton;
    public GameObject _mediumButton;
    public GameObject _easyButton;
    public GameObject _easyMedButton;
    public GameObject _medHardButton;

    public GameObject _tie;
    public GameObject _whiteWins;
    public GameObject _blackWins;

    public GameObject _GameButton;
    private GameObject[,] _GameButtonArr;

    public GameObject _canvas;

    // Start is called before the first frame update
    void Start()
    {
        currentTeam = Side.Empty;
        finishedConfiguration = false;
        difficulty = -1;

        /*
        Transform transforms;
        transforms = _canvas.transform;
        transforms.position = = new Vector3(i, -1, j);
        transforms.rotation = Quaternion.Euler(0, 0, -180);
        */

        //playerMoveIndex = -1;
        //Button whiteButton = _whiteButton.GetComponent<Button>();
        _whiteButton.SetActive(true);
        _blackButton.SetActive(true);
        _easyButton.SetActive(false);
        _mediumButton.SetActive(false);
        _hardButton.SetActive(false);
        _easyMedButton.SetActive(false);
        _medHardButton.SetActive(false);

        _whiteWins.SetActive(false);
        _blackWins.SetActive(false);
        _tie.SetActive(false);
        _whiteButton.GetComponent<Button>().onClick.AddListener(delegate () { ChooseTeam("White"); });
        //Button blackButton = _whiteButton.GetComponent<Button>();
        _blackButton.GetComponent<Button>().onClick.AddListener(delegate () { ChooseTeam("Black"); });
        _easyButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(1); });
        _easyMedButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(3); });
        _mediumButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(5); });
        _medHardButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(6); });
        _hardButton.GetComponent<Button>().onClick.AddListener(delegate () { SetDifficulty(7); });

        

    }

    private void Start2()
    {
        

        
        //interactables = new Interactables();
        //finishedConfiguration = false;
        //difficulty = -1;
        currentPlayer = Side.White;
        win = 0;
        // initialize start board
        board = new Side[8, 8];
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                board[i, j] = Side.Empty;
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
        
        _pieceObject = new GameObject[8, 8];
        _GameButtonArr = new GameObject[8, 8];
        //_piece = Resources.Load<GameObject>("Assets/Objects/Model_Piece.fbx");
        //_piece = GameObject.CreatePrimitive(PrimitiveType.Cube);
        //Transform[,] transforms = new Transform[8, 8];
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                Transform transforms;
                if (board[i, j] == Side.Empty)
                {
                    _pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, -1, j);
                    transforms.rotation = Quaternion.Euler(0, 0, -180);
                }
                else if (board[i, j] == Side.Black)
                {
                    _pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, 1, j);
                    transforms.rotation = Quaternion.Euler(0, 0, -180);
                }
                else if (board[i, j] == Side.White)
                {
                    _pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, 1, j);
                    transforms.rotation = Quaternion.Euler(180, 0, -180);
                }
            }
        }
        
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                Transform transforms;
                Point point = new Point(j, i);
                _GameButtonArr[i, j] = GameObject.Instantiate(_GameButton);
                
                transforms = _GameButtonArr[i, j].transform;
                
                transforms.position = new Vector3(j, 1.1f, i);
                transforms.rotation = Quaternion.Euler(90, 0, 90);
                transforms.localScale = new Vector3(0.01205457f, 0.01205457f, 0.01205457f);
                transforms.SetParent(_canvas.transform);
                _GameButtonArr[i, j].GetComponent<Button>().onClick.AddListener(delegate () {
                    ClickPoint(point); 
                });
            }
        }
    }

    void ClickPoint(Point point)
    {
        if (!finishedConfiguration)
        {
            return;
        }

        if (win != 0)
        {
            return;
        }

        if (currentPlayer == currentTeam)
        {
            Side[,] newboard = new Side[8, 8];
            newboard = PlayerMoveHelper.FindBoardGivenSelection(point, board, currentPlayer);
            if (PlayerMoveHelper.BoardsMatch(newboard, board))
            { // move not allowed
                return;
            }

            board = MiniMax.copyBoard(newboard);

            if (MiniMax.isTerminal(board))
            {
                float whoWon = MiniMax.heuristic(board, 0, Side.White);
                if (whoWon == 1000)
                {
                    // white wins
                    win = 1;
                }
                else if (whoWon == -1000)
                {
                    // black wins
                    win = 2;
                }
                else
                {
                    // tie
                    win = 3;
                }
            }

            currentPlayer = MiniMax.returnOppositeSide(currentPlayer);

            

        }
        
    }

    // Update is called once per frame
    void Update()
    {
        if (!finishedConfiguration)
        {
            if (currentTeam != Side.Empty)
            {
                //currentPlayer = currentTeam;
                if (difficulty != -1)
                {
                    finishedConfiguration = true;
                }
                
            }
            return;
        }


        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                
                Side[,] newboard = new Side[8, 8];
                newboard = PlayerMoveHelper.FindBoardGivenSelection(new Point(j, i), board, currentPlayer);
                if (PlayerMoveHelper.BoardsMatch(newboard, board))
                { // move not allowed
                    _GameButtonArr[i, j].SetActive(false);
                }
                else
                {
                    _GameButtonArr[i, j].SetActive(true);
                }
            }
        }

        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                Transform transforms;
                if (board[i, j] == Side.Empty)
                {
                    //_pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, -1, j);
                    transforms.rotation = Quaternion.Euler(0, 0, -180);
                }
                else if (board[i, j] == Side.Black)
                {
                    //_pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, 1, j);
                    transforms.rotation = Quaternion.Euler(0, 0, -180);
                }
                else if (board[i, j] == Side.White)
                {
                    //_pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, 1, j);
                    transforms.rotation = Quaternion.Euler(180, 0, -180);
                }
            }
        }

        //Thread.Sleep(2000);
        // calculate AI move and make it
        if (win != 0)
        {
            // display who won
            if (win == 1)
            {
                // white wins
                _whiteWins.SetActive(true);
            }
            else if (win == 2)
            {
                // black wins
                _blackWins.SetActive(true);
            }
            else
            {
                // tie
                _tie.SetActive(true);
            }

            return;
        }
        if (currentPlayer != currentTeam)
        {
            //Thread.Sleep(2000);
            //MiniMax miniMax = new MiniMax();
            MiniMaxNode treeOrigin = new MiniMaxNode(board, currentPlayer);
            MiniMax.minimax(treeOrigin, difficulty, currentPlayer, true);
            if (treeOrigin.children.Count == 0)
            {
                if (MiniMax.isTerminal(board))
                {
                    float whoWon = MiniMax.heuristic(board, 0, Side.White);
                    if (whoWon == 1000)
                    {
                        // white wins
                        win = 1;
                    }
                    else if (whoWon == -1000)
                    {
                        // black wins
                        win = 2;
                    }
                    else
                    {
                        // tie
                        win = 3;
                    }
                }
                return;
            }
            MiniMaxNode bestChild = treeOrigin.children[0];
            for (int i = 1; i < treeOrigin.children.Count; i++)
            {
                if (bestChild.heuristic < treeOrigin.children[i].heuristic)
                {
                    bestChild = treeOrigin.children[i];
                }
            }
            board = MiniMax.copyBoard(bestChild.board);
            //currentPlayer = Side.White;

            if (MiniMax.isTerminal(board))
            {
                float whoWon = MiniMax.heuristic(board, 0, Side.White);
                if (whoWon == 1000)
                {
                    // white wins
                    win = 1;
                }
                else if (whoWon == -1000)
                {
                    // black wins
                    win = 2;
                }
                else
                {
                    // tie
                    win = 3;
                }
            }
            currentPlayer = MiniMax.returnOppositeSide(currentPlayer);
        }
        

        /*
        MiniMaxNode treeOrigin = new MiniMaxNode(board, currentPlayer);

        board = treeOrigin.board;
        Side[,] newboard = MiniMax.copyBoard(board);
        newboard[1, 1] = Side.Black;
        treeOrigin.giveChild(new MiniMaxNode(newboard, Side.Black, treeOrigin));
        board = MiniMax.copyBoard(treeOrigin.children[0].board);
        int numChildNodes = MiniMax.numPossibleMoves(treeOrigin.board, currentPlayer);
        Console.WriteLine(numChildNodes);
        */
        //board[1, 1] = Side.Black;
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                Transform transforms;
                if (board[i, j] == Side.Empty)
                {
                    //_pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, -1, j);
                    transforms.rotation = Quaternion.Euler(0, 0, -180);
                }
                else if (board[i, j] == Side.Black)
                {
                    //_pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, 1, j);
                    transforms.rotation = Quaternion.Euler(0, 0, -180);
                }
                else if (board[i, j] == Side.White)
                {
                    //_pieceObject[i, j] = GameObject.Instantiate(_piece);
                    transforms = _pieceObject[i, j].transform;
                    transforms.position = new Vector3(i, 1, j);
                    transforms.rotation = Quaternion.Euler(180, 0, -180);
                }
            }
        }
    }

    void SetDifficulty(int difficulty)
    {
        this.difficulty = difficulty;
        _easyButton.SetActive(false);
        _mediumButton.SetActive(false);
        _hardButton.SetActive(false);
        _easyMedButton.SetActive(false);
        _medHardButton.SetActive(false);
        Start2();
    }

    void ChooseTeam(string team)
    {
        if (team.CompareTo("White") == 0)
        {
            currentTeam = Side.White;
        }
        else
        {
            currentTeam = Side.Black;
        }
        _whiteButton.SetActive(false);
        _blackButton.SetActive(false);
        _easyButton.SetActive(true);
        _mediumButton.SetActive(true);
        _hardButton.SetActive(true);
        _easyMedButton.SetActive(true);
        _medHardButton.SetActive(true);
        //_whiteButton.
    }


}
