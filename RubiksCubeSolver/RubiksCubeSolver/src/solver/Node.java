package solver;

import behaviour.Board;

public class Node {
	public int moveCount; // the movecount of the current node. The parent node would have a movecount of 0
	public Board currentBoard; // the state of the rubik's cube for this node;
	public int heuristic;
	
	/*
	 * these nodes would be the children of this node corresponding to the
	 * move made between this node and the next node.
	 * For example: LNode represents a node with a board state of this board + a LMove.
	 *  LPNode would be a node with a board state of this board + a LPrimeMove
	 */
	public Node LNode, FNode, RNode, BNode, UNode, DNode;
	public Node LPNode, FPNode, RPNode, BPNode, UPNode, DPNode;
	public Node LLNode, RRNode, UUNode, DDNode;
	//public Node MNode, SNode, ENode; // NOTE: might calculate this might not we will see
	
	/**
	 * Constructor for Node given board.
	 * This Constructor is used for creating the parent node
	 * @param board
	 */
	public Node(Board board) {
		currentBoard = new Board(board);
		moveCount = 0;
		heuristic = -1;
	}
	
	public void GenerateWhiteCrossHeuristic() {
		WhiteCross.Heuristic(currentBoard);
	}
}
