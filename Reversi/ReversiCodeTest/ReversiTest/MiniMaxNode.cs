using System.Collections;
using System.Collections.Generic;
//using UnityEngine;

public class MiniMaxNode
{
    public Side[,] board;
    public MiniMaxNode parent;
    public List<MiniMaxNode> children;
    private int childrenCount;
    public float heuristic;
    public Side currentPlayer; // who gets the next move
    
    public MiniMaxNode(Side[,] board, MiniMaxNode parent, List<MiniMaxNode> children, float heuristic, Side currentPlayer)
    {
        this.currentPlayer = currentPlayer;
        this.board = MiniMax.copyBoard(board);
        this.parent = parent;
        this.children = children;
        this.heuristic = heuristic;
        childrenCount = children.Count;
    }
    

    public MiniMaxNode(Side[,] board, float heuristic, Side currentPlayer)
    {
        this.currentPlayer = currentPlayer;
        this.board = MiniMax.copyBoard(board);
        this.heuristic = heuristic;
        childrenCount = 0;
        children = new List<MiniMaxNode>();
    }

    public MiniMaxNode(Side[,] board, Side currentPlayer)
    {
        this.currentPlayer = currentPlayer;
        this.board = MiniMax.copyBoard(board);
        childrenCount = 0;
        children = new List<MiniMaxNode>();
    }

    public MiniMaxNode(Side[,] board, Side currentPlayer, MiniMaxNode parent)
    {
        this.currentPlayer = currentPlayer;
        this.parent = parent;
        this.board = MiniMax.copyBoard(board);
        childrenCount = 0;
        children = new List<MiniMaxNode>();
    }

    

    public void giveChild(MiniMaxNode newChild)
    {
        children.Add(newChild);
        childrenCount++;
    }
    public void printBoard()
    {
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                String tempstr = "";
                if (board[i, j] == Side.Empty)
                {
                    tempstr = " ";
                }
                else if (board[i, j] == Side.White)
                {
                    tempstr = "W";
                }
                else
                {
                    tempstr = "B";
                }
                Console.Write(tempstr + " ");
            }
            Console.Write("\n");
        }
    }
    /*
    private static Side[,] copyBoard(Side[,] board)
    {
        Side[,] newBoard = new Side[8, 8];

        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                newBoard[i, j] = board[i, j];
            }
        }

        return newBoard;
    }*/
}
