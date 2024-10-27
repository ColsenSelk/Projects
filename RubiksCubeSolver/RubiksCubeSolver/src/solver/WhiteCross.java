package solver;

import behaviour.Board;
import behaviour.Color;

/*
 * This class holds methods that aid in creating a white cross for solving a Rubik's Cube.
 * A White Cross looks like this:
 *        X X X
 *        X G X
 *        X G X
 *        X W X
 *        W W W
 *        X W X
 *  X R X X B X X O X
 *  X R X X B X X O X
 *  X X X X X X X X X
 *        X X X
 *        X X X
 *        X X X
 */
public class WhiteCross {
	
	/**
	 * generates heuristic specific to board for creating the white cross.
	 * The closer the board is to having a White Cross the higher the heuristic value returned.
	 * The worst heuristic possible is 0.
	 * 
	 * @param board
	 * @return
	 */
	public static int Heuristic(Board board) {
		int heuristic = 0;
		
		// if the board has a white cross then return Integer.MAX_VALUE
		if (HasWhiteCross(board)) {
			heuristic = Integer.MAX_VALUE;
			return heuristic;
		}
		
		Board newBoard = new Board(board);
		/* 
		 * Give big points for White Tiles in their correct spot.
		 * As long as the tiles are aligned correctly with each other it doesn't matter much if the
		 * TopSide is not rotated correctly.
		 */
		heuristic = HeuristicHelper1(newBoard);
		if (heuristic == Integer.MAX_VALUE - 10) {
			return heuristic;
		}
		
		/*
		 * small points should be given if a white tile can be turned to be correct on the TopSide
		 */
		heuristic = HeuristicHelper2(heuristic, newBoard);
		
		return heuristic;
	}
	
	/* 
	 * Give big points for White Tiles in their correct spot.
	 * As long as the tiles are aligned correctly with each other it doesn't matter much if the
	 * TopSide is not rotated correctly.
	 */
	private static int HeuristicHelper1(Board newBoard) {
		int heuristic = 0;
		for (int i = 0; i < 4; i++) {
			int thisHeuristic = 0;
			int count = 0;
			if (newBoard.TopSide[0][1] == Color.WHITE && newBoard.BackSide[2][1] == Color.GREEN) {
				thisHeuristic = thisHeuristic + 100;
				count++;
			}
			if (newBoard.TopSide[2][1] == Color.WHITE && newBoard.FrontSide[0][1] == Color.BLUE) {
				thisHeuristic = thisHeuristic + 100;
				count++;
			}
			if (newBoard.TopSide[1][0] == Color.WHITE && newBoard.LeftSide[0][1] == Color.RED) {
				thisHeuristic = thisHeuristic + 100;
				count++;
			}
			if (newBoard.TopSide[1][2] == Color.WHITE && newBoard.RightSide[0][1] == Color.ORANGE) {
				thisHeuristic = thisHeuristic + 100;
				count++;
			}
			
			/*
			 *  If the board can have a white cross in 1 more move then it should have a very high heuristic.
			 *  Might have to remove this if it causes too much latency.
			 */
			if (count == 4) { // if this is true then it only takes 1 move to achieve white-cross
				heuristic = Integer.MAX_VALUE - 10;
				return heuristic;
			}
			newBoard.MoveU();
			
			if (thisHeuristic > heuristic) { // heuristic is assigned max heuristic found when rotating the TopSide
				heuristic = thisHeuristic;
			}
		}
		
		return heuristic;
	}
	
	/**
	 * Check if moving up a white tile (using only 1 move) to the TopSide creates a better
	 * heuristic for HeuristicHelper1. If it does set this as the new heuristic but with a small
	 * penalty for the added moves needed
	 * 
	 * @param heuristic: marks the heuristic calculated so far
	 * @param newBoard
	 * @return
	 */
	private static int HeuristicHelper2(int heuristic, Board newBoard) { // this might be intensive for latency so might not be used.
		newBoard.MoveF();
		for (int i = 0; i < 3; i++) {
			int newHeuristic = HeuristicHelper1(newBoard);
			newHeuristic = newHeuristic - 10; // add a small penalty for an extra move being needed
			if (newHeuristic > heuristic) {
				heuristic = newHeuristic;
			}
			newBoard.MoveF();
		}
		newBoard.MoveL();
		for (int i = 0; i < 3; i++) {
			int newHeuristic = HeuristicHelper1(newBoard);
			newHeuristic = newHeuristic - 10; // add a small penalty for an extra move being needed
			if (newHeuristic > heuristic) {
				heuristic = newHeuristic;
			}
			newBoard.MoveL();
		}
		newBoard.MoveR();
		for (int i = 0; i < 3; i++) {
			int newHeuristic = HeuristicHelper1(newBoard);
			newHeuristic = newHeuristic - 10; // add a small penalty for an extra move being needed
			if (newHeuristic > heuristic) {
				heuristic = newHeuristic;
			}
			newBoard.MoveR();
		}
		newBoard.MoveB();
		for (int i = 0; i < 3; i++) {
			int newHeuristic = HeuristicHelper1(newBoard);
			newHeuristic = newHeuristic - 10; // add a small penalty for an extra move being needed
			if (newHeuristic > heuristic) {
				heuristic = newHeuristic;
			}
			newBoard.MoveB();
		}
		
		return heuristic;
	}
	
	private static boolean HasWhiteCross(Board board) {
		// check relevant white tiles
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				if ((i == j) || (i == 2 && j == 0) || (i == 0 && j == 2)) { // we dont care about the top corners
					continue;
				}
				if (board.TopSide[i][j] != Color.WHITE) {
					return false;
				}
			}
		}
		// check front, left, right, back
		if (board.FrontSide[0][1] != Color.BLUE
				|| board.LeftSide[0][1] != Color.RED
				|| board.LeftSide[0][1] != Color.ORANGE
				|| board.BackSide[2][1] != Color.GREEN) {
			return false;
		}
		
		return true;
	}
}
