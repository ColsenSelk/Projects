package behaviour;

import java.util.Random;

/*
 * This Class holds a Rubik's Cubes' state, and allows modification of its state using
 * move methods.
 * 
 * A solved Rubik's Cube takes the shape of:
 *    0 1 2 3 4 5 6 7 8
 * 0        G G G
 * 1        G G G
 * 2        G G G
 * 3        W W W
 * 4        W W W
 * 5        W W W
 * 6  R R R B B B O O O
 * 7  R R R B B B O O O
 * 8  R R R B B B O O O
 * 9        Y Y Y
 * 10       Y Y Y
 * 11       Y Y Y
 *        
 * Where G stands for Green, W stands for White, R stands for Red,
 * B stands for Blue, O stands for Orange, and Y stands for Yellow.
 * 
 * In this case, the Green Tiles would be the BackSide, the White Tiles would be
 * the TopSide, the Red Tiles would be the LeftSide, the Blue Tiles would be the FrontSide,
 * the Orange Tiles would be the RightSide, and the Yellow Tiles would be the BottomSide.
 * 
 */
public class Board {
	public Color[][] FrontSide;
	public Color[][] TopSide;
	public Color[][] BackSide;
	public Color[][] BottomSide;
	public Color[][] LeftSide;
	public Color[][] RightSide;
	
	/*
	 * Duplicate/copy an existing Rubik's Cube into this Rubik's Cube
	 */
	public Board(Board board) {
		FrontSide = new Color[3][3];
		TopSide = new Color[3][3];
		BackSide = new Color[3][3];
		BottomSide = new Color[3][3];
		LeftSide = new Color[3][3];
		RightSide = new Color[3][3];
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				FrontSide[i][j] = board.FrontSide[i][j];
				TopSide[i][j] = board.TopSide[i][j];
				BackSide[i][j] = board.BackSide[i][j];
				BottomSide[i][j] = board.BottomSide[i][j];
				LeftSide[i][j] = board.LeftSide[i][j];
				RightSide[i][j] = board.RightSide[i][j];
			}
		}
	}
	
	/*
	 * Create new Rubik's Cube in a solved state
	 */
	public Board() {
		//System.out.println("WARNING: You've created a solved Rubik's Cube.");
		
		FrontSide = new Color[3][3]; fillSide(Color.BLUE, FrontSide);
		TopSide = new Color[3][3]; fillSide(Color.WHITE, TopSide);
		BackSide = new Color[3][3]; fillSide(Color.GREEN, BackSide);
		BottomSide = new Color[3][3]; fillSide(Color.YELLOW, BottomSide);
		LeftSide = new Color[3][3]; fillSide(Color.RED, LeftSide);
		RightSide = new Color[3][3]; fillSide(Color.ORANGE, RightSide);
	}
	
	/*
	 * Creates new Rubik's Cube and shuffles it randomly based on seed
	 */
	public Board(int seed) {
		if (seed < 0) {
			seed = Math.abs(seed);
		}
		if (seed >= Integer.MAX_VALUE - 50) {
			seed = seed - 1000;
		}
		
		FrontSide = new Color[3][3]; fillSide(Color.BLUE, FrontSide);
		TopSide = new Color[3][3]; fillSide(Color.WHITE, TopSide);
		BackSide = new Color[3][3]; fillSide(Color.GREEN, BackSide);
		BottomSide = new Color[3][3]; fillSide(Color.YELLOW, BottomSide);
		LeftSide = new Color[3][3]; fillSide(Color.RED, LeftSide);
		RightSide = new Color[3][3]; fillSide(Color.ORANGE, RightSide);
		
		shuffleBoard(seed);
	}
	
	/*
	 * fills the specified side of the Rubik's Cube with the specified color
	 */
	private void fillSide(Color color, Color[][] side) {
		int i = 0; int j = 0;
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				side[i][j] = color;
			}
		}
	}
	
	/*
	 * Shuffle this Rubik's Cube by doing a bunch of random moves based on seed
	 */
	protected void shuffleBoard(int seed) {
		// determine the amount of shuffling moves
		int numMoves = seed % 40 + 10;
		
		// make a random move numMoves times
		Random random = new Random(seed);
		for (int i = 0; i < numMoves; i++) {
			switch(Math.abs(random.nextInt() % 12)) { // TODO
				case 0:
					MoveR();
					break;
				case 1:
					MoveRPrime();
					break;
				case 2:
					MoveL();
					break;
				case 3:
					MoveLPrime();
					break;
				case 4:
					
					break;
				case 5:
					
					break;
				case 6:
					
					break;
				case 7:
					
					break;
				case 8:
					
					break;
				case 9:
					
					break;
				case 10:
					
					break;
				case 11:
					
					break;
				default:
					System.out.println("ERROR something went wrong selecting shuffle move");
					break;
			}
		}
		
		// if the board somehow is still in a solved condition then re-shuffle with a new seed
		if (BoardChecks.IsSolved(this)) {
			shuffleBoard(Math.abs(seed - (Math.abs(random.nextInt()) % 10)));
		}
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "B"
	 * 
	 * State-wise: 
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 *        W0W1W2
	 *        W W W
	 *        W W W
	 *  R2R R B B B O O O0
	 *  R1R R B B B O O O1
	 *  R0R R B B B O O O2
	 *        Y Y Y
	 *        Y Y Y
	 *        Y2Y1Y0
	 * would become
	 *        7 4 1
	 *        8 5 2
	 *        9 6 3
	 *        O0O1O2
	 *        W W W
	 *        W W W
	 *  W2R R B B B O O Y0
	 *  W1R R B B B O O Y1
	 *  W0R R B B B O O Y2
	 *        Y Y Y
	 *        Y Y Y
	 *        R2R1R0
	 */
	public void MoveB() {
		
		// Shift row 3, column 0, row 11, column 8 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = TopSide[0][0];
		tempColorStorage[1] = TopSide[0][1];
		tempColorStorage[2] = TopSide[0][2];
		tempColorStorage[3] = RightSide[2][2];
		tempColorStorage[4] = RightSide[1][2];
		tempColorStorage[5] = RightSide[0][2];
		tempColorStorage[6] = BottomSide[2][2];
		tempColorStorage[7] = BottomSide[2][1];
		tempColorStorage[8] = BottomSide[2][0];
		tempColorStorage[9] = LeftSide[2][0];
		tempColorStorage[10] = LeftSide[1][0];
		tempColorStorage[11] = LeftSide[0][0];
		TopSide[0][0] = tempColorStorage[3];
		TopSide[0][1] = tempColorStorage[4];
		TopSide[0][2] = tempColorStorage[5];
		RightSide[2][2] = tempColorStorage[6];
		RightSide[1][2] = tempColorStorage[7];
		RightSide[0][2] = tempColorStorage[8];
		BottomSide[2][2] = tempColorStorage[9];
		BottomSide[2][1] = tempColorStorage[10];
		BottomSide[2][0] = tempColorStorage[11];
		LeftSide[2][0] = tempColorStorage[0];
		LeftSide[1][0] = tempColorStorage[1];
		LeftSide[0][0] = tempColorStorage[2];
		
		//rotate BackSide clockwise once
		BackSide = RotateSideClockwise(BackSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "B'"
	 * 
	 * State-wise: 
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 *        W0W1W2
	 *        W W W
	 *        W W W
	 *  R2R R B B B O O O0
	 *  R1R R B B B O O O1
	 *  R0R R B B B O O O2
	 *        Y Y Y
	 *        Y Y Y
	 *        Y2Y1Y0
	 * would become
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 *        R0R1R2
	 *        W W W
	 *        W W W
	 *  Y2R R B B B O O W0
	 *  Y1R R B B B O O W1
	 *  Y0R R B B B O O W2
	 *        Y Y Y
	 *        Y Y Y
	 *        O2O1O0
	 */
	public void MoveBPrime() {
		
		// Shift row 3, column 0, row 11, column 8 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = TopSide[0][0];
		tempColorStorage[1] = TopSide[0][1];
		tempColorStorage[2] = TopSide[0][2];
		tempColorStorage[3] = RightSide[2][2];
		tempColorStorage[4] = RightSide[1][2];
		tempColorStorage[5] = RightSide[0][2];
		tempColorStorage[6] = BottomSide[2][2];
		tempColorStorage[7] = BottomSide[2][1];
		tempColorStorage[8] = BottomSide[2][0];
		tempColorStorage[9] = LeftSide[2][0];
		tempColorStorage[10] = LeftSide[1][0];
		tempColorStorage[11] = LeftSide[0][0];
		TopSide[0][0] = tempColorStorage[9];
		TopSide[0][1] = tempColorStorage[10];
		TopSide[0][2] = tempColorStorage[11];
		RightSide[2][2] = tempColorStorage[0];
		RightSide[1][2] = tempColorStorage[1];
		RightSide[0][2] = tempColorStorage[2];
		BottomSide[2][2] = tempColorStorage[3];
		BottomSide[2][1] = tempColorStorage[4];
		BottomSide[2][0] = tempColorStorage[5];
		LeftSide[2][0] = tempColorStorage[6];
		LeftSide[1][0] = tempColorStorage[7];
		LeftSide[0][0] = tempColorStorage[8];
		
		//rotate BackSide counter-clockwise once
		BackSide = RotateSideCounterClockwise(BackSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "F"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W2W1W0
	 *  R R R01 2 3 O2O O
	 *  R R R14 5 6 O1O O
	 *  R R R27 8 9 O0O O
	 *        Y0Y1Y2
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        R2R1R0
	 *  R R Y07 4 1 W2O O
	 *  R R Y18 5 2 W1O O
	 *  R R Y29 6 3 W0O O
	 *        O0O1O2
	 *        Y Y Y
	 *        Y Y Y
	 */
	public void MoveF() {
		
		// Shift row 9, column 6, row 5, column 2 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = BottomSide[0][0];
		tempColorStorage[1] = BottomSide[0][1];
		tempColorStorage[2] = BottomSide[0][2];
		tempColorStorage[3] = RightSide[2][0];
		tempColorStorage[4] = RightSide[1][0];
		tempColorStorage[5] = RightSide[0][0];
		tempColorStorage[6] = TopSide[2][2];
		tempColorStorage[7] = TopSide[2][1];
		tempColorStorage[8] = TopSide[2][0];
		tempColorStorage[9] = LeftSide[0][2];
		tempColorStorage[10] = LeftSide[1][2];
		tempColorStorage[11] = LeftSide[2][2];
		BottomSide[0][0] = tempColorStorage[3];
		BottomSide[0][1] = tempColorStorage[4];
		BottomSide[0][2] = tempColorStorage[5];
		RightSide[2][0] = tempColorStorage[6];
		RightSide[1][0] = tempColorStorage[7];
		RightSide[0][0] = tempColorStorage[8];
		TopSide[2][2] = tempColorStorage[9];
		TopSide[2][1] = tempColorStorage[10];
		TopSide[2][0] = tempColorStorage[11];
		LeftSide[0][2] = tempColorStorage[0];
		LeftSide[1][2] = tempColorStorage[1];
		LeftSide[2][2] = tempColorStorage[2];
		
		//rotate FrontSide clockwise once
		FrontSide = RotateSideClockwise(FrontSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "F'"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W2W1W0
	 *  R R R01 2 3 O2O O
	 *  R R R14 5 6 O1O O
	 *  R R R27 8 9 O0O O
	 *        Y0Y1Y2
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        O2O1O0
	 *  R R W03 6 9 Y2O O
	 *  R R W12 5 8 Y1O O
	 *  R R W21 4 7 Y0O O
	 *        R0R1R2
	 *        Y Y Y
	 *        Y Y Y
	 */
	public void MoveFPrime() {
		
		// Shift row 9, column 6, row 5, column 2 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = BottomSide[0][0];
		tempColorStorage[1] = BottomSide[0][1];
		tempColorStorage[2] = BottomSide[0][2];
		tempColorStorage[3] = RightSide[2][0];
		tempColorStorage[4] = RightSide[1][0];
		tempColorStorage[5] = RightSide[0][0];
		tempColorStorage[6] = TopSide[2][2];
		tempColorStorage[7] = TopSide[2][1];
		tempColorStorage[8] = TopSide[2][0];
		tempColorStorage[9] = LeftSide[0][2];
		tempColorStorage[10] = LeftSide[1][2];
		tempColorStorage[11] = LeftSide[2][2];
		BottomSide[0][0] = tempColorStorage[9];
		BottomSide[0][1] = tempColorStorage[10];
		BottomSide[0][2] = tempColorStorage[11];
		RightSide[2][0] = tempColorStorage[0];
		RightSide[1][0] = tempColorStorage[1];
		RightSide[0][0] = tempColorStorage[2];
		TopSide[2][2] = tempColorStorage[3];
		TopSide[2][1] = tempColorStorage[4];
		TopSide[2][0] = tempColorStorage[5];
		LeftSide[0][2] = tempColorStorage[6];
		LeftSide[1][2] = tempColorStorage[7];
		LeftSide[2][2] = tempColorStorage[8];
		
		//rotate FrontSide counter-clockwise once
		FrontSide = RotateSideCounterClockwise(FrontSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "D"
	 * 
	 * State-wise: 
	 *        G2G1G0
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *  R0R1R2B0B1B2O0O1O2
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 * would become
	 *        O2O1O0
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *  G0G1G2R0R1R2B0B1B2
	 *        7 4 1
	 *        8 5 2
	 *        9 6 3
	 */
	public void MoveD() {
		
		// Shift row 0 and 8 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = LeftSide[2][0];
		tempColorStorage[1] = LeftSide[2][1];
		tempColorStorage[2] = LeftSide[2][2];
		tempColorStorage[3] = FrontSide[2][0];
		tempColorStorage[4] = FrontSide[2][1];
		tempColorStorage[5] = FrontSide[2][2];
		tempColorStorage[6] = RightSide[2][0];
		tempColorStorage[7] = RightSide[2][1];
		tempColorStorage[8] = RightSide[2][2];
		tempColorStorage[9] = BackSide[2][2]; // note how it goes 2 1 0 here instead of 0 1 2
		tempColorStorage[10] = BackSide[2][1];
		tempColorStorage[11] = BackSide[2][0];
		LeftSide[2][0] = tempColorStorage[9];
		LeftSide[2][1] = tempColorStorage[10];
		LeftSide[2][2] = tempColorStorage[11];
		FrontSide[2][0] = tempColorStorage[0];
		FrontSide[2][1] = tempColorStorage[1];
		FrontSide[2][2] = tempColorStorage[2];
		RightSide[2][0] = tempColorStorage[3];
		RightSide[2][1] = tempColorStorage[4];
		RightSide[2][2] = tempColorStorage[5];
		BackSide[2][2] = tempColorStorage[6]; // note how it goes 2 1 0 here instead of 0 1 2
		BackSide[2][1] = tempColorStorage[7];
		BackSide[2][0] = tempColorStorage[8];
		
		//rotate BottomSide clockwise once
		BottomSide = RotateSideClockwise(BottomSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "D'"
	 * 
	 * State-wise: 
	 *        G2G1G0
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *  R0R1R2B0B1B2O0O1O2
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 * would become
	 *        R2R1R0
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *  B0B1B2O0O1O2G0G1G2
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 */
	public void MoveDPrime() {
		
		// Shift row 0 and 8 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = LeftSide[2][0];
		tempColorStorage[1] = LeftSide[2][1];
		tempColorStorage[2] = LeftSide[2][2];
		tempColorStorage[3] = FrontSide[2][0];
		tempColorStorage[4] = FrontSide[2][1];
		tempColorStorage[5] = FrontSide[2][2];
		tempColorStorage[6] = RightSide[2][0];
		tempColorStorage[7] = RightSide[2][1];
		tempColorStorage[8] = RightSide[2][2];
		tempColorStorage[9] = BackSide[2][2]; // note how it goes 2 1 0 here instead of 0 1 2
		tempColorStorage[10] = BackSide[2][1];
		tempColorStorage[11] = BackSide[2][0];
		LeftSide[2][0] = tempColorStorage[3];
		LeftSide[2][1] = tempColorStorage[4];
		LeftSide[2][2] = tempColorStorage[5];
		FrontSide[2][0] = tempColorStorage[6];
		FrontSide[2][1] = tempColorStorage[7];
		FrontSide[2][2] = tempColorStorage[8];
		RightSide[2][0] = tempColorStorage[9];
		RightSide[2][1] = tempColorStorage[10];
		RightSide[2][2] = tempColorStorage[11];
		BackSide[2][2] = tempColorStorage[0]; // note how it goes 2 1 0 here instead of 0 1 2
		BackSide[2][1] = tempColorStorage[1];
		BackSide[2][0] = tempColorStorage[2];
		
		//rotate BottomSide counter-clockwise once
		BottomSide = RotateSideCounterClockwise(BottomSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "U"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G2G1G0
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 *  R0R1R2B0B1B2O0O1O2
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        G G G
	 *        G G G
	 *        R2R1R0
	 *        7 4 1
	 *        8 5 2
	 *        9 6 3
	 *  B0B1B2O0O1O2G0G1G2
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 */
	public void MoveU() {
		
		// Shift row 2 and 6 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = LeftSide[0][0];
		tempColorStorage[1] = LeftSide[0][1];
		tempColorStorage[2] = LeftSide[0][2];
		tempColorStorage[3] = FrontSide[0][0];
		tempColorStorage[4] = FrontSide[0][1];
		tempColorStorage[5] = FrontSide[0][2];
		tempColorStorage[6] = RightSide[0][0];
		tempColorStorage[7] = RightSide[0][1];
		tempColorStorage[8] = RightSide[0][2];
		tempColorStorage[9] = BackSide[0][2]; // note how it goes 2 1 0 here instead of 0 1 2
		tempColorStorage[10] = BackSide[0][1];
		tempColorStorage[11] = BackSide[0][0];
		LeftSide[0][0] = tempColorStorage[3];
		LeftSide[0][1] = tempColorStorage[4];
		LeftSide[0][2] = tempColorStorage[5];
		FrontSide[0][0] = tempColorStorage[6];
		FrontSide[0][1] = tempColorStorage[7];
		FrontSide[0][2] = tempColorStorage[8];
		RightSide[0][0] = tempColorStorage[9];
		RightSide[0][1] = tempColorStorage[10];
		RightSide[0][2] = tempColorStorage[11];
		BackSide[0][2] = tempColorStorage[0]; // note how it goes 2 1 0 here instead of 0 1 2
		BackSide[0][1] = tempColorStorage[1];
		BackSide[0][0] = tempColorStorage[2];
		
		//rotate TopSide clockwise once
		TopSide = RotateSideClockwise(TopSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "U'"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G2G1G0
	 *        1 2 3
	 *        4 5 6
	 *        7 8 9
	 *  R0R1R2B0B1B2O0O1O2
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        G G G
	 *        G G G
	 *        O2O1O0
	 *        3 6 9
	 *        2 5 8
	 *        1 4 7
	 *  G0G1G2R0R1R2B0B1B2
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 */
	public void MoveUPrime() {
		
		// Shift row 2 and 6 together
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = LeftSide[0][0];
		tempColorStorage[1] = LeftSide[0][1];
		tempColorStorage[2] = LeftSide[0][2];
		tempColorStorage[3] = FrontSide[0][0];
		tempColorStorage[4] = FrontSide[0][1];
		tempColorStorage[5] = FrontSide[0][2];
		tempColorStorage[6] = RightSide[0][0];
		tempColorStorage[7] = RightSide[0][1];
		tempColorStorage[8] = RightSide[0][2];
		tempColorStorage[9] = BackSide[0][2]; // note how it goes 2 1 0 here instead of 0 1 2
		tempColorStorage[10] = BackSide[0][1];
		tempColorStorage[11] = BackSide[0][0];
		LeftSide[0][0] = tempColorStorage[9];
		LeftSide[0][1] = tempColorStorage[10];
		LeftSide[0][2] = tempColorStorage[11];
		FrontSide[0][0] = tempColorStorage[0];
		FrontSide[0][1] = tempColorStorage[1];
		FrontSide[0][2] = tempColorStorage[2];
		RightSide[0][0] = tempColorStorage[3];
		RightSide[0][1] = tempColorStorage[4];
		RightSide[0][2] = tempColorStorage[5];
		BackSide[0][2] = tempColorStorage[6]; // note how it goes 2 1 0 here instead of 0 1 2
		BackSide[0][1] = tempColorStorage[7];
		BackSide[0][0] = tempColorStorage[8];
		
		//rotate TopSide counter-clockwise once
		TopSide = RotateSideCounterClockwise(TopSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "R"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B 1 2 3
	 *  R R R B B B 4 5 6
	 *  R R R B B B 7 8 9
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        G G W
	 *        G G W
	 *        G G W
	 *        W W B
	 *        W W B
	 *        W W B
	 *  R R R B B Y 7 4 1
	 *  R R R B B Y 8 5 2
	 *  R R R B B Y 9 6 3
	 *        Y Y G
	 *        Y Y G
	 *        Y Y G
	 */
	public void MoveR() {
		
		// Shift column 5
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = BackSide[0][2];
		tempColorStorage[1] = BackSide[1][2];
		tempColorStorage[2] = BackSide[2][2];
		tempColorStorage[3] = TopSide[0][2];
		tempColorStorage[4] = TopSide[1][2];
		tempColorStorage[5] = TopSide[2][2];
		tempColorStorage[6] = FrontSide[0][2];
		tempColorStorage[7] = FrontSide[1][2];
		tempColorStorage[8] = FrontSide[2][2];
		tempColorStorage[9] = BottomSide[0][2];
		tempColorStorage[10] = BottomSide[1][2];
		tempColorStorage[11] = BottomSide[2][2];
		BackSide[0][2] = tempColorStorage[3];
		BackSide[1][2] = tempColorStorage[4];
		BackSide[2][2] = tempColorStorage[5];
		TopSide[0][2] = tempColorStorage[6];
		TopSide[1][2] = tempColorStorage[7];
		TopSide[2][2] = tempColorStorage[8];
		FrontSide[0][2] = tempColorStorage[9];
		FrontSide[1][2] = tempColorStorage[10];
		FrontSide[2][2] = tempColorStorage[11];
		BottomSide[0][2] = tempColorStorage[0];
		BottomSide[1][2] = tempColorStorage[1];
		BottomSide[2][2] = tempColorStorage[2];
		
		//rotate RightSide clockwise once
		RightSide = RotateSideClockwise(RightSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "R'"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B 1 2 3
	 *  R R R B B B 4 5 6
	 *  R R R B B B 7 8 9
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        G G Y
	 *        G G Y
	 *        G G Y
	 *        W W G
	 *        W W G
	 *        W W G
	 *  R R R B B W 3 6 9
	 *  R R R B B W 2 5 8
	 *  R R R B B W 1 4 7
	 *        Y Y B
	 *        Y Y B
	 *        Y Y B
	 */
	public void MoveRPrime() {
		
		// Shift column 5
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = BackSide[0][2];
		tempColorStorage[1] = BackSide[1][2];
		tempColorStorage[2] = BackSide[2][2];
		tempColorStorage[3] = TopSide[0][2];
		tempColorStorage[4] = TopSide[1][2];
		tempColorStorage[5] = TopSide[2][2];
		tempColorStorage[6] = FrontSide[0][2];
		tempColorStorage[7] = FrontSide[1][2];
		tempColorStorage[8] = FrontSide[2][2];
		tempColorStorage[9] = BottomSide[0][2];
		tempColorStorage[10] = BottomSide[1][2];
		tempColorStorage[11] = BottomSide[2][2];
		BackSide[0][2] = tempColorStorage[9];
		BackSide[1][2] = tempColorStorage[10];
		BackSide[2][2] = tempColorStorage[11];
		TopSide[0][2] = tempColorStorage[0];
		TopSide[1][2] = tempColorStorage[1];
		TopSide[2][2] = tempColorStorage[2];
		FrontSide[0][2] = tempColorStorage[3];
		FrontSide[1][2] = tempColorStorage[4];
		FrontSide[2][2] = tempColorStorage[5];
		BottomSide[0][2] = tempColorStorage[6];
		BottomSide[1][2] = tempColorStorage[7];
		BottomSide[2][2] = tempColorStorage[8];
		
		//rotate RightSide clockwise once
		RightSide = RotateSideCounterClockwise(RightSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "L'"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  1 2 3 B B B O O O
	 *  4 5 6 B B B O O O
	 *  7 8 9 B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        W G G
	 *        W G G
	 *        W G G
	 *        B W W
	 *        B W W
	 *        B W W
	 *  3 6 9 Y B B O O O
	 *  2 5 8 Y B B O O O
	 *  1 4 7 Y B B O O O
	 *        G Y Y
	 *        G Y Y
	 *        G Y Y
	 */
	public void MoveLPrime() {
		
		// Shift column 3
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = BackSide[0][0];
		tempColorStorage[1] = BackSide[1][0];
		tempColorStorage[2] = BackSide[2][0];
		tempColorStorage[3] = TopSide[0][0];
		tempColorStorage[4] = TopSide[1][0];
		tempColorStorage[5] = TopSide[2][0];
		tempColorStorage[6] = FrontSide[0][0];
		tempColorStorage[7] = FrontSide[1][0];
		tempColorStorage[8] = FrontSide[2][0];
		tempColorStorage[9] = BottomSide[0][0];
		tempColorStorage[10] = BottomSide[1][0];
		tempColorStorage[11] = BottomSide[2][0];
		BackSide[0][0] = tempColorStorage[3];
		BackSide[1][0] = tempColorStorage[4];
		BackSide[2][0] = tempColorStorage[5];
		TopSide[0][0] = tempColorStorage[6];
		TopSide[1][0] = tempColorStorage[7];
		TopSide[2][0] = tempColorStorage[8];
		FrontSide[0][0] = tempColorStorage[9];
		FrontSide[1][0] = tempColorStorage[10];
		FrontSide[2][0] = tempColorStorage[11];
		BottomSide[0][0] = tempColorStorage[0];
		BottomSide[1][0] = tempColorStorage[1];
		BottomSide[2][0] = tempColorStorage[2];
		
		//rotate LeftSide counter-clockwise once
		LeftSide = RotateSideCounterClockwise(LeftSide);
	}
	
	/*
	 * "Cuber's" use a standardized method for making moves.
	 * This link can familiarize you with those move sets:
	 * These move methods seek to stay within their standards.
	 * 
	 * This move represents "L"
	 * 
	 * State-wise: 
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  1 2 3 B B B O O O
	 *  4 5 6 B B B O O O
	 *  7 8 9 B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 * would become
	 *        Y G G
	 *        Y G G
	 *        Y G G
	 *        G W W
	 *        G W W
	 *        G W W
	 *  7 4 1 W B B O O O
	 *  8 5 2 W B B O O O
	 *  9 6 3 W B B O O O
	 *        B Y Y
	 *        B Y Y
	 *        B Y Y
	 */
	public void MoveL() {
		
		// Shift column 3
		Color[] tempColorStorage = new Color[12];
		tempColorStorage[0] = BackSide[0][0];
		tempColorStorage[1] = BackSide[1][0];
		tempColorStorage[2] = BackSide[2][0];
		tempColorStorage[3] = TopSide[0][0];
		tempColorStorage[4] = TopSide[1][0];
		tempColorStorage[5] = TopSide[2][0];
		tempColorStorage[6] = FrontSide[0][0];
		tempColorStorage[7] = FrontSide[1][0];
		tempColorStorage[8] = FrontSide[2][0];
		tempColorStorage[9] = BottomSide[0][0];
		tempColorStorage[10] = BottomSide[1][0];
		tempColorStorage[11] = BottomSide[2][0];
		BackSide[0][0] = tempColorStorage[9];
		BackSide[1][0] = tempColorStorage[10];
		BackSide[2][0] = tempColorStorage[11];
		TopSide[0][0] = tempColorStorage[0];
		TopSide[1][0] = tempColorStorage[1];
		TopSide[2][0] = tempColorStorage[2];
		FrontSide[0][0] = tempColorStorage[3];
		FrontSide[1][0] = tempColorStorage[4];
		FrontSide[2][0] = tempColorStorage[5];
		BottomSide[0][0] = tempColorStorage[6];
		BottomSide[1][0] = tempColorStorage[7];
		BottomSide[2][0] = tempColorStorage[8];
		
		//rotate LeftSide clockwise once
		LeftSide = RotateSideClockwise(LeftSide);
	}
	
	// TODO these double moves can be recoded to run faster
	/**
	 * just 2 MoveL's. counts as 1 move.
	 */
	public void MoveLL() {
		MoveL();
		MoveL();
	}
	/**
	 * just 2 MoveR's. counts as 1 move.
	 */
	public void MoveRR() {
		MoveR();
		MoveR();
	}
	/**
	 * just 2 MoveU's. counts as 1 move.
	 */
	public void MoveUU() {
		MoveU();
		MoveU();
	}
	/**
	 * just 2 MoveD's. counts as 1 move.
	 */
	public void MoveDD() {
		MoveD();
		MoveD();
	}
	/**
	 * just 2 MoveF's. counts as 1 move.
	 */
	public void MoveFF() {
		MoveF();
		MoveF();
	}
	/**
	 * just 2 MoveB's. counts as 1 move.
	 */
	public void MoveBB() {
		MoveB();
		MoveB();
	}
	/**
	 * 1 MoveL and 1 MoveR. counts as 1 move.
	 */
	public void MoveM() {
		MoveL();
		MoveR();
	}
	/**
	 * 1 MoveU and 1 MoveD. counts as 1 move.
	 */
	public void MoveE() {
		MoveU();
		MoveD();
	}
	/**
	 * 1 MoveF and 1 MoveB. counts as 1 move.
	 */
	public void MoveS() {
		MoveF();
		MoveB();
	}
	
	/*
	 * rotates a side clockwise such that if 'Color[][] side' starts as:
	 * 1 2 3
	 * 4 5 6
	 * 7 8 9
	 * it will return:
	 * 7 4 1
	 * 8 5 2
	 * 9 6 3
	 */
	static private Color[][] RotateSideClockwise(Color[][] side) {
		Color[][] returnSide = new Color[3][3];
		for (int i = 0; i < 3; i++) {
	        for (int j = 0; j < 3; j++) {
	            returnSide[j][2-i] = side[i][j];
	        }
	    }
		return returnSide;
	}
	
	// TODO CHECK THIS
	/*
	 * rotates a side clockwise such that if 'Color[][] side' starts as:
	 * 1 2 3
	 * 4 5 6
	 * 7 8 9
	 * it will return:
	 * 3 6 9
	 * 2 5 8
	 * 1 4 7
	 */
	static private Color[][] RotateSideCounterClockwise(Color[][] side) {
		Color[][] returnSide = new Color[3][3];
		for (int i = 0; i < 3; i++) {
	        for (int j = 0; j < 3; j++) {
	            returnSide[2-j][i] = side[i][j];
	        }
	    }
		return returnSide;
	}
	
	
	/*
	 * Prints the state of the Rubik's Cube to console.
	 * A solved cube would look like this printed out:
	 *        G G G
	 *        G G G
	 *        G G G
	 *        W W W
	 *        W W W
	 *        W W W
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *  R R R B B B O O O
	 *        Y Y Y
	 *        Y Y Y
	 *        Y Y Y
	 */
	public void PrintBoard() {
		
		// print BackSide
		for (int i = 0; i < 3; i++) {
			System.out.print("      ");
			for (int j = 0; j < 3; j++) {
				switch (BackSide[i][j]) {
					case YELLOW:
						System.out.print("Y ");
						break;
					case WHITE:
						System.out.print("W ");
						break;
					case RED:
						System.out.print("R ");
						break;
					case BLUE:
						System.out.print("B ");
						break;
					case ORANGE:
						System.out.print("O ");
						break;
					case GREEN:
						System.out.print("G ");
						break;
					default:
						System.out.print("ERROR when checking color in PrintBoard");
						break;
				}
			}
			System.out.println("");
		}
		
		// print TopSide
		for (int i = 0; i < 3; i++) {
			System.out.print("      ");
			for (int j = 0; j < 3; j++) {
				switch (TopSide[i][j]) {
					case YELLOW:
						System.out.print("Y ");
						break;
					case WHITE:
						System.out.print("W ");
						break;
					case RED:
						System.out.print("R ");
						break;
					case BLUE:
						System.out.print("B ");
						break;
					case ORANGE:
						System.out.print("O ");
						break;
					case GREEN:
						System.out.print("G ");
						break;
					default:
						System.out.print("ERROR when checking color in PrintBoard");
						break;
				}
			}
			System.out.println("");
		}
		
		// print LeftSide, FrontSide, and RightSide
		for (int i = 0; i < 3; i++) {
			// print LeftSide
			for (int j = 0; j < 3; j++) {
				switch (LeftSide[i][j]) {
					case YELLOW:
						System.out.print("Y ");
						break;
					case WHITE:
						System.out.print("W ");
						break;
					case RED:
						System.out.print("R ");
						break;
					case BLUE:
						System.out.print("B ");
						break;
					case ORANGE:
						System.out.print("O ");
						break;
					case GREEN:
						System.out.print("G ");
						break;
					default:
						System.out.print("ERROR when checking color in PrintBoard");
						break;
				}
			}
			// print FrontSide
			for (int j = 0; j < 3; j++) {
				switch (FrontSide[i][j]) {
					case YELLOW:
						System.out.print("Y ");
						break;
					case WHITE:
						System.out.print("W ");
						break;
					case RED:
						System.out.print("R ");
						break;
					case BLUE:
						System.out.print("B ");
						break;
					case ORANGE:
						System.out.print("O ");
						break;
					case GREEN:
						System.out.print("G ");
						break;
					default:
						System.out.print("ERROR when checking color in PrintBoard");
						break;
				}
			}
			// print RightSide
			for (int j = 0; j < 3; j++) {
				switch (RightSide[i][j]) {
					case YELLOW:
						System.out.print("Y ");
						break;
					case WHITE:
						System.out.print("W ");
						break;
					case RED:
						System.out.print("R ");
						break;
					case BLUE:
						System.out.print("B ");
						break;
					case ORANGE:
						System.out.print("O ");
						break;
					case GREEN:
						System.out.print("G ");
						break;
					default:
						System.out.print("ERROR when checking color in PrintBoard");
						break;
				}
			}
			System.out.println("");
		}
		
		// print BottomSide
		for (int i = 0; i < 3; i++) {
			System.out.print("      ");
			for (int j = 0; j < 3; j++) {
				switch (BottomSide[i][j]) {
					case YELLOW:
						System.out.print("Y ");
						break;
					case WHITE:
						System.out.print("W ");
						break;
					case RED:
						System.out.print("R ");
						break;
					case BLUE:
						System.out.print("B ");
						break;
					case ORANGE:
						System.out.print("O ");
						break;
					case GREEN:
						System.out.print("G ");
						break;
					default:
						System.out.print("ERROR when checking color in PrintBoard");
						break;
				}
			}
			System.out.println("");
		}
		
		
	}
}
