using System.Collections;
using System.Collections.Generic;
//using UnityEngine;

public class MiniMax
{
    /*enum Side
    {
        Empty,
        Black,
        White
    }*/


    public static float minimax(MiniMaxNode node, int depth, Side calculatedPlayer, bool maximizingPlayer) // returns the heuristic value of node
    {
        bool terminal = isTerminal(node.board);
        if (depth == 0 || terminal)
        {
            if (maximizingPlayer)
            {
                node.heuristic = heuristic(node.board, depth, calculatedPlayer);
            } else
            {
                node.heuristic = heuristic(node.board, depth, returnOppositeSide(calculatedPlayer));
            }
            return node.heuristic;
        }

        if (maximizingPlayer)
        {
            node.heuristic = -100000000;

            // generate children of node unless node already has children
            int numChildNodes = numPossibleMoves(node.board, calculatedPlayer);
            if (node.children.Count == 0)
            {
                Side[,,] moves = possibleMoves(node.board, calculatedPlayer);
                for (int i = 0; i < numChildNodes; i++)
                {
                    node.giveChild(new MiniMaxNode(Array3DTo2DConverter(moves, i), returnOppositeSide(calculatedPlayer), node));
                }
            }

            // assign node.heuristic to the value of the max heuristic among child nodes
            float maxHeuristic = node.heuristic;
            for (int i = 0; i < numChildNodes; i++)
            {
                float childHeuristic;
                minimax(node.children[i], depth - 1, returnOppositeSide(calculatedPlayer), false);
                childHeuristic = node.children[i].heuristic;
                if (childHeuristic > maxHeuristic)
                {
                    maxHeuristic = childHeuristic;
                }
            }
            node.heuristic = maxHeuristic;
            return node.heuristic;
        }
        else // minimizing player
        {
            node.heuristic = 100000000;

            // generate children of node unless node already has children
            int numChildNodes = numPossibleMoves(node.board, calculatedPlayer);
            if (node.children.Count == 0)
            {
                Side[,,] moves = possibleMoves(node.board, calculatedPlayer);
                for (int i = 0; i < numChildNodes; i++)
                {
                    node.giveChild(new MiniMaxNode(Array3DTo2DConverter(moves, i), returnOppositeSide(calculatedPlayer), node));
                }
            }

            // assign node.heuristic to the value of the min heuristic among child nodes
            float minHeuristic = node.heuristic;
            for (int i = 0; i < numChildNodes; i++)
            {
                float childHeuristic;
                childHeuristic = minimax(node.children[i], depth - 1, returnOppositeSide(calculatedPlayer), true);
                //childHeuristic = node.children[i].heuristic;
                if (childHeuristic < minHeuristic)
                {
                    minHeuristic = childHeuristic;
                }
            }
            node.heuristic = minHeuristic;
            return node.heuristic;
        }

        //return node.heuristic;
    }

    public static Side[,] copyBoard(Side[,] board)
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
    }

    private static Side returnOppositeSide(Side side)
    {
        if (side == Side.White)
        {
            return Side.Black;
        }
        else if (side == Side.Black)
        {
            return Side.White;
        }
        return Side.Empty;
    }

    private static Side[,] Array3DTo2DConverter(Side[,,] allMoves, int k)
    {
        Side[,] newBoard = new Side[8, 8];
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                newBoard[i, j] = allMoves[k, i, j];
            }
        }
        return newBoard;
    }

    static bool isTerminal(Side[,] board)
    {
        // check if board is full
        bool boardFull = true;
        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                if (board[i, j] == Side.Empty)
                {
                    boardFull = false;
                }
            }
        }
        if (boardFull)
        {
            return true;
        }

        // check if both players cant make a move
        if (numPossibleMoves(board, Side.White) == 0 && numPossibleMoves(board, Side.Black) == 0)
        {
            return true;
        }


        return false;
    }

    public static Side[,,] possibleMoves(Side[,] board, Side playerToMakeMove) // returns Side[(board1, board2, board3, ...), row, col)
    {
        Side[,,] newBoards = new Side[30, 8, 8];
        int moveCounter = 0;

        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                if (moveCounter == 30) // there shouldn't be more than 30 moves, but in case there is: stop finding new moves to reduce latency
                {
                    break;
                }
                // copy board
                for (int i2 = 0; i2 < 8; ++i2)
                {
                    for (int j2 = 0; j2 < 8; ++j2)
                    {
                        newBoards[moveCounter, i2, j2] = board[i2, j2];
                    }
                }

                // make sure spot is empty
                if (board[i, j] != Side.Empty)
                {
                    continue;
                }

                // check left
                bool leftWorks = false;
                int othersidej = -1;
                int tempj = j - 1;
                if (tempj <= 0)
                {
                    // then left not work
                }
                else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
                {
                    // then left not work
                }
                else
                {
                    while (tempj >= 1)
                    {
                        if (board[i, tempj] != playerToMakeMove && board[i, tempj] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[i, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[i, tempj] == playerToMakeMove && board[i, tempj - 1] == Side.Empty)
                        {
                            othersidej = tempj - 1;
                            leftWorks = true;
                            break;
                        }
                        --tempj;
                    }
                }
                if (leftWorks)
                {
                    for (int j2 = othersidej + 1; j2 <= j; j2++)
                    {
                        newBoards[moveCounter, i, j2] = playerToMakeMove;
                    }
                }

                // check right
                bool rightWorks = false;
                othersidej = -1;
                tempj = j + 1;
                if (tempj >= 7)
                {
                    // then right not work
                }
                else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
                {
                    // then right not work
                }
                else
                {
                    while (tempj <= 6)
                    {
                        if (board[i, tempj] != playerToMakeMove && board[i, tempj] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[i, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[i, tempj] == playerToMakeMove && board[i, tempj + 1] == Side.Empty)
                        {
                            othersidej = tempj + 1;
                            rightWorks = true;
                            break;
                        }
                        ++tempj;
                    }
                }
                if (rightWorks)
                {
                    for (int j2 = j; j2 < othersidej; j2++)
                    {
                        newBoards[moveCounter, i, j2] = playerToMakeMove;
                    }
                }


                // check up
                bool upWorks = false;
                int othersidei = -1;
                int tempi = i - 1;
                if (tempi <= 0)
                {
                    // then up not work
                }
                else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
                {
                    // then up not work
                }
                else
                {
                    while (tempi >= 1)
                    {
                        if (board[tempi, j] != playerToMakeMove && board[tempi, j] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[tempi, j] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, j] == playerToMakeMove && board[tempi - 1, j] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            upWorks = true;
                            break;
                        }
                        --tempi;
                    }
                }
                if (upWorks)
                {
                    for (int i2 = othersidei + 1; i2 <= i; i2++)
                    {
                        newBoards[moveCounter, i2, j] = playerToMakeMove;
                    }
                }


                // check down
                bool downWorks = false;
                othersidei = -1;
                tempi = i + 1;
                if (tempi >= 7)
                {
                    // then down not work
                }
                else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
                {
                    // then down not work
                }
                else
                {
                    while (tempi <= 6)
                    {
                        if (board[tempi, j] != playerToMakeMove && board[tempi, j] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[tempi, j] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, j] == playerToMakeMove && board[tempi + 1, j] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            downWorks = true;
                            break;
                        }
                        ++tempi;
                    }
                }
                if (downWorks)
                {
                    for (int i2 = i; i2 < othersidei; i2++)
                    {
                        newBoards[moveCounter, i2, j] = playerToMakeMove;
                    }
                }


                // check DR
                bool DRWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i + 1;
                tempj = j + 1;
                if (tempi >= 7 || tempj >= 7)
                {
                    // then DR not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then DR not work
                }
                else
                {
                    while (tempi <= 6 && tempj <= 6)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj + 1] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            othersidej = tempj + 1;
                            DRWorks = true;
                            break;
                        }
                        ++tempi;
                        ++tempj;
                    }
                }
                if (DRWorks)
                {
                    for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
                    {
                        newBoards[moveCounter, i + counter, j + counter] = playerToMakeMove;
                    }
                }


                // check DL
                bool DLWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i + 1;
                tempj = j - 1;
                if (tempi >= 7 || tempj <= 0)
                {
                    // then DL not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then DL not work
                }
                else
                {
                    while (tempi <= 6 && tempj >= 1)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj - 1] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            othersidej = tempj - 1;
                            DLWorks = true;
                            break;
                        }
                        ++tempi;
                        --tempj;
                    }
                }
                if (DLWorks)
                {
                    for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
                    {
                        newBoards[moveCounter, i + counter, j - counter] = playerToMakeMove;
                    }
                }


                // check UR
                bool URWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i - 1;
                tempj = j + 1;
                if (tempi <= 0 || tempj >= 7)
                {
                    // then UR not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then UR not work
                }
                else
                {
                    while (tempi >= 1 && tempj <= 6)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj + 1] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            othersidej = tempj + 1;
                            URWorks = true;
                            break;
                        }
                        --tempi;
                        ++tempj;
                    }
                }
                if (URWorks)
                {
                    for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
                    {
                        newBoards[moveCounter, i - counter, j + counter] = playerToMakeMove;
                    }
                }


                // check UL
                bool ULWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i - 1;
                tempj = j - 1;
                if (tempi <= 0 || tempj <= 0)
                {
                    // then UL not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then UL not work
                }
                else
                {
                    while (tempi >= 1 && tempj >= 1)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {
                            //continue;
                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj - 1] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            othersidej = tempj - 1;
                            ULWorks = true;
                            break;
                        }
                        --tempi;
                        --tempj;
                    }
                }
                if (ULWorks)
                {
                    for (int counter = 0; counter < System.Math.Abs(i - othersidei); counter++)
                    {
                        newBoards[moveCounter, i - counter, j - counter] = playerToMakeMove;
                    }
                }










                if (leftWorks || rightWorks || upWorks || downWorks || ULWorks || URWorks || DLWorks || DRWorks)
                {
                    moveCounter++;
                    continue;
                }
            }
        }


        return newBoards;
    }

    public static int numPossibleMoves(Side[,] board, Side playerToMakeMove) // returns Side[(board1, board2, board3, ...), row, col)
    {
        //Side[,,] newBoards = new Side[64, 8, 8];
        int moveCounter = 0;

        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                //Console.WriteLine("board[" + i + ", " + j + "]" + "MoveCounter: " + moveCounter);

                if (moveCounter == 30)
                {
                    break;
                }
                // make sure spot is empty
                if (board[i, j] != Side.Empty)
                {
                    continue;
                }

                // check left
                //Console.WriteLine("Check Left");
                bool leftWorks = false;
                int othersidej = -1;
                int tempj = j - 1;
                if (tempj <= 0)
                {
                    // then left not work
                }
                else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
                {
                    // then left not work
                }
                else
                {
                    while (tempj >= 1)
                    {
                        if (board[i, tempj] != playerToMakeMove && board[i, tempj] != Side.Empty)
                        {

                        }
                        else if (board[i, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[i, tempj] == playerToMakeMove && board[i, tempj - 1] == Side.Empty)
                        {
                            othersidej = tempj - 1;
                            leftWorks = true;
                            break;
                        }
                        --tempj;
                    }
                }
                if (leftWorks)
                {
                    //Console.WriteLine("Left Works");
                    moveCounter++;
                    continue;
                }

                // check right
                //Console.WriteLine("Check Right");
                bool rightWorks = false;
                othersidej = -1;
                tempj = j + 1;
                if (tempj >= 7)
                {
                    // then right not work
                }
                else if (board[i, tempj] == playerToMakeMove || board[i, tempj] == Side.Empty)
                {
                    // then right not work
                }
                else
                {
                    while (tempj <= 6)
                    {
                        if (board[i, tempj] != playerToMakeMove && board[i, tempj] != Side.Empty)
                        {

                        }
                        else if (board[i, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[i, tempj] == playerToMakeMove && board[i, tempj + 1] == Side.Empty)
                        {
                            othersidej = tempj + 1;
                            rightWorks = true;
                            break;
                        }
                        ++tempj;
                    }
                }
                if (rightWorks)
                {
                    //Console.WriteLine("Right Works");
                    moveCounter++;
                    continue;
                }


                // check up
                //Console.WriteLine("Check Up");
                bool upWorks = false;
                int othersidei = -1;
                int tempi = i - 1;
                if (tempi <= 0)
                {
                    // then up not work
                }
                else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
                {
                    // then up not work
                }
                else
                {
                    while (tempi >= 1)
                    {
                        if (board[tempi, j] != playerToMakeMove && board[tempi, j] != Side.Empty)
                        {

                        }
                        else if (board[tempi, j] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, j] == playerToMakeMove && board[tempi - 1, j] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            upWorks = true;
                            break;
                        }
                        --tempi;
                    }
                }
                if (upWorks)
                {
                    //Console.WriteLine("Up Works");
                    moveCounter++;
                    continue;
                }


                // check down
                //Console.WriteLine("Check Down");
                bool downWorks = false;
                othersidei = -1;
                tempi = i + 1;
                if (tempi >= 7)
                {
                    // then down not work
                }
                else if (board[tempi, j] == playerToMakeMove || board[tempi, j] == Side.Empty)
                {
                    // then down not work
                }
                else
                {
                    while (tempi <= 6)
                    {
                        if (board[tempi, j] != playerToMakeMove && board[tempi, j] != Side.Empty)
                        {

                        }
                        else if (board[tempi, j] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, j] == playerToMakeMove && board[tempi + 1, j] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            downWorks = true;
                            break;
                        }
                        ++tempi;
                    }
                }
                if (downWorks)
                {
                    //Console.WriteLine("Down Works");
                    moveCounter++;
                    continue;
                }


                // check DR
                //Console.WriteLine("Check DR");
                bool DRWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i + 1;
                tempj = j + 1;
                if (tempi >= 7 || tempj >= 7)
                {
                    // then DR not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then DR not work
                }
                else
                {
                    while (tempi <= 6 && tempj <= 6)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {
                            //Console.WriteLine("continue DR");
                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            //Console.WriteLine("DR not work");
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj + 1] == Side.Empty)
                        {
                            //Console.WriteLine("DR works");
                            othersidei = tempi + 1;
                            othersidej = tempj + 1;
                            DRWorks = true;
                            break;
                        }
                        ++tempi;
                        ++tempj;
                    }
                }
                if (DRWorks)
                {
                    //Console.WriteLine("DR works");
                    moveCounter++;
                    continue;
                }


                // check DL
                //Console.WriteLine("Check DL");
                bool DLWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i + 1;
                tempj = j - 1;
                if (tempi >= 7 || tempj <= 0)
                {
                    // then DL not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then DL not work
                }
                else
                {
                    while (tempi <= 6 && tempj >= 1)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {

                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi + 1, tempj - 1] == Side.Empty)
                        {
                            othersidei = tempi + 1;
                            othersidej = tempj - 1;
                            DLWorks = true;
                            break;
                        }
                        ++tempi;
                        --tempj;
                    }
                }
                if (DLWorks)
                {
                    //Console.WriteLine("DL works");
                    moveCounter++;
                    continue;
                }


                // check UR
                //Console.WriteLine("Check UR");
                bool URWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i - 1;
                tempj = j + 1;
                if (tempi <= 0 || tempj >= 7)
                {
                    // then UR not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then UR not work
                }
                else
                {
                    while (tempi >= 1 && tempj <= 6)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {

                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj + 1] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            othersidej = tempj + 1;
                            URWorks = true;
                            break;
                        }
                        --tempi;
                        ++tempj;
                    }
                }
                if (URWorks)
                {
                    //Console.WriteLine("UR works");
                    moveCounter++;
                    continue;
                }


                // check UL
                //Console.WriteLine("Check UL");
                bool ULWorks = false;
                othersidei = -1;
                othersidej = -1;
                tempi = i - 1;
                tempj = j - 1;
                if (tempi <= 0 || tempj <= 0)
                {
                    // then UL not work
                }
                else if (board[tempi, tempj] == playerToMakeMove || board[tempi, tempj] == Side.Empty)
                {
                    // then UL not work
                }
                else
                {
                    while (tempi >= 1 && tempj >= 1)
                    {
                        if (board[tempi, tempj] != playerToMakeMove && board[tempi, tempj] != Side.Empty)
                        {

                        }
                        else if (board[tempi, tempj] == Side.Empty)
                        {
                            break;
                        }
                        else if (board[tempi, tempj] == playerToMakeMove && board[tempi - 1, tempj - 1] == Side.Empty)
                        {
                            othersidei = tempi - 1;
                            othersidej = tempj - 1;
                            ULWorks = true;
                            break;
                        }
                        --tempi;
                        --tempj;
                    }
                }
                if (ULWorks)
                {
                    //Console.WriteLine("UL works");
                    moveCounter++;
                    continue;
                }


                /*
                if (leftWorks || rightWorks || upWorks || downWorks || ULWorks || URWorks || DLWorks || DRWorks)
                {
                    moveCounter++;
                    continue;
                }*/
            }
        }


        return moveCounter;
    }

    public static float heuristic(Side[,] board, int depth, Side calculatedPlayer)
    {
        //const float depthImpact = -0.2f;
        float heuristic = 0;
        float emptyModifier = 1; // the less empty spots, the more advantage the player who is winning has... ?

        for (int i = 0; i < 8; i++)
        {
            for (int j = 0; j < 8; j++)
            {
                if (board[i, j] == calculatedPlayer)
                {
                    heuristic = heuristic + 1;
                }
                else if (board[i, j] == Side.Empty)
                {
                    emptyModifier = emptyModifier - 0.003f;
                }
                else
                {
                    heuristic = heuristic - 1;
                }
            }
        }

        if (isTerminal(board))
        {
            if (heuristic > 0)
            {
                heuristic = 1000; // calculated player wins
            }
            else if (heuristic < 0)
            {
                heuristic = -1000; // calculated player loses
            }
            else
            {
                heuristic = 0; // tie
            }

            return heuristic;
        }

        heuristic = heuristic * emptyModifier;
        return heuristic;
    }
}
