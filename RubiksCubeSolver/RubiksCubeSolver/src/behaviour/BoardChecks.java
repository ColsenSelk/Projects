package behaviour;

public class BoardChecks {
	
	/**
	 * Checks is the Rubik's Cube given is solved or not.
	 * @param board
	 * @return returns true if the Rubik's Cube is solved, otherwise false.
	 */
	public static boolean IsSolved(Board board) {
		// if the Rubik's Cube is solved then it will match a solved cube
		Board solvedBoard = new Board(); // creates a solved board
		return BoardsMatch(board, solvedBoard); // check if board matches a solved board
	}
	
	/**
	 * Checks if board1 is in the same state as board2.
	 * @param board1
	 * @param board2
	 * @return returns true if the boards match, otherwise false.
	 */
	public static boolean BoardsMatch(Board board1, Board board2) {
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				if (board1.BackSide[i][j] != board2.BackSide[i][j]) {
					return false;
				}
				if (board1.TopSide[i][j] != board2.TopSide[i][j]) {
					return false;
				}
				if (board1.FrontSide[i][j] != board2.FrontSide[i][j]) {
					return false;
				}
				if (board1.BottomSide[i][j] != board2.BottomSide[i][j]) {
					return false;
				}
				if (board1.LeftSide[i][j] != board2.LeftSide[i][j]) {
					return false;
				}
				if (board1.RightSide[i][j] != board2.RightSide[i][j]) {
					return false;
				}
			}
		}
		
		return true;
	}
}
