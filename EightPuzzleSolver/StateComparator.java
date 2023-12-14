package edu.iastate.cs472.proj1;

import java.util.Comparator;

/**
 *  
 * @author Colsen Selk
 *
 */

/**
 * This method compares two states in the lexicographical order of the board configuration. 
 * The 3X3 array representing each board configuration is converted into a sequence of nine 
 * digits starting at the 0th row, and within each row, at the 0th column.  For example, the 
 * two states
 * 
 * 	   2 0 3        2 8 1 
 *     1 8 4        7 5 3 
 *     7 6 5        6 0 4 
 *
 * are converted into the sequences <2,0,3,1,8,4,7,6,5>, and <2,8,1,7,5,3,6,0,4>, respectively. 
 * By definition the first state is less than the second one.  
 * 
 * The comparator will be used for maintaining the CLOSED list used in the A* algorithm. 
 */
public class StateComparator implements Comparator<State>
{
	@Override
	public int compare(State s1, State s2)
	{
		int[] boardArr1 = new int[9];
		int[] boardArr2 = new int[9];
		int iter = 0;
		for (int i = 0; i < 3; i++) { // turns boards into flat arrays
			for (int j = 0; j < 3; j++) {
				//if (this.board[i][j] == 0) {
					//continue;
				//}
				boardArr2[iter] = s2.board[i][j];
				boardArr1[iter] = s1.board[i][j];
				iter = iter + 1;
			}
		}
		
		for (int i = 0; i < 9; i++) {
			if (Integer.compare(boardArr1[i], boardArr2[i]) != 0) {
				return Integer.compare(boardArr1[i], boardArr2[i]);
			}
		}
		
	    return 0;
	}  		
}
