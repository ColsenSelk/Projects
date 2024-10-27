package testPackage;

import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import behaviour.Board;
import behaviour.BoardChecks;
import behaviour.Color;

public class BoardTests {
	public Board rubiksCube;
	
	@BeforeEach
	public void create() {
		//rubiksCube = new Board();
	}
	
	@Test
	public void NewSolvedCubeTest() { // tests if a solved board initializes properly. also checks BoardChecks.IsSolved
		rubiksCube = new Board();
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				assertTrue((rubiksCube.FrontSide[i][j] == Color.BLUE));
				assertTrue((rubiksCube.TopSide[i][j] == Color.WHITE));
				assertTrue((rubiksCube.BackSide[i][j] == Color.GREEN));
				assertTrue((rubiksCube.BottomSide[i][j] == Color.YELLOW));
				assertTrue((rubiksCube.LeftSide[i][j] == Color.RED));
				assertTrue((rubiksCube.RightSide[i][j] == Color.ORANGE));
			}
		}
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		//System.out.println("New Solved Cube:");
		//rubiksCube.PrintBoard();
	}
	
	@Test
	public void NewUnsolvedCubeTest() { // tests if a new unsolved board initializes properly and is unsolved
		rubiksCube = new Board(1021034);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board(-13012);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board(0);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board(Integer.MAX_VALUE);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board(Integer.MIN_VALUE);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board(Integer.MAX_VALUE + 20);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board(Integer.MAX_VALUE - 51);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
	}
	
	@Test
	public void IsSolvedTest() { // make sure IsSolved checks work
		rubiksCube = new Board(1021034);
		assertTrue((false == BoardChecks.IsSolved(rubiksCube)));
		rubiksCube = new Board();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	
	@Test
	public void BoardMatchTest() { // make sure BoardMatch checks work
		Board rubiksCube2 = new Board(1021034);
		rubiksCube = new Board(1021034);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube2 = new Board(1021034);
		rubiksCube = new Board(1021034);
		rubiksCube.MoveL();
		assertTrue((false == BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)));
	}
	
	@Test
	public void seedTest() { // checks if the same seeds will equal each other
		Board rubiksCube2 = new Board(1021034);
		rubiksCube = new Board(1021034);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube = new Board(-13012);
		rubiksCube2 = new Board(-13012);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube = new Board(0);
		rubiksCube2 = new Board(0);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube = new Board(Integer.MAX_VALUE);
		rubiksCube2 = new Board(Integer.MAX_VALUE);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube = new Board(Integer.MIN_VALUE);
		rubiksCube2 = new Board(Integer.MIN_VALUE);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube = new Board(Integer.MAX_VALUE + 20);
		rubiksCube2 = new Board(Integer.MAX_VALUE + 20);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube = new Board(Integer.MAX_VALUE - 51);
		rubiksCube2 = new Board(Integer.MAX_VALUE - 51);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void LeftMovesTest1() { // tests if L and L' moves work (specifically tests the column shifts)
		rubiksCube = new Board();
		rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveL();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	@Test
	public void LeftMovesTest2() { // tests if L and L' moves work
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)); // if this one has an error its a problem with seeding
		rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveL();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveLPrime(); rubiksCube.MoveLPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveL(); rubiksCube.MoveL(); rubiksCube.MoveL();
		rubiksCube2.MoveLPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void RightMovesTest1() { // tests if R and R' moves work (specifically tests the column shifts)
		rubiksCube = new Board();
		rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveR();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	@Test
	public void RightMovesTest2() { // tests if R and R' moves work
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)); // if this one has an error its a problem with seeding
		rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveR();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveRPrime(); rubiksCube.MoveRPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveR(); rubiksCube.MoveR(); rubiksCube.MoveR();
		rubiksCube2.MoveRPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void UpMovesTest1() { // tests if U and U' moves work (specifically tests the column shifts)
		rubiksCube = new Board();
		rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveU();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	@Test
	public void UpMovesTest2() { // tests if U and U' moves work
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)); // if this one has an error its a problem with seeding
		rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveU();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveUPrime(); rubiksCube.MoveUPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveU(); rubiksCube.MoveU(); rubiksCube.MoveU();
		rubiksCube2.MoveUPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void DownMovesTest1() { // tests if D and D' moves work (specifically tests the column shifts)
		rubiksCube = new Board();
		rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveD();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	@Test
	public void DownMovesTest2() { // tests if D and D' moves work
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)); // if this one has an error its a problem with seeding
		rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveD();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveDPrime(); rubiksCube.MoveDPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveD(); rubiksCube.MoveD(); rubiksCube.MoveD();
		rubiksCube2.MoveDPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void FrontMovesTest1() { // tests if F and F' moves work (specifically tests the column shifts)
		rubiksCube = new Board();
		rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveF();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	@Test
	public void FrontMovesTest2() { // tests if F and F' moves work
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)); // if this one has an error its a problem with seeding
		rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveF();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveFPrime(); rubiksCube.MoveFPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveF(); rubiksCube.MoveF(); rubiksCube.MoveF();
		rubiksCube2.MoveFPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void BackMovesTest1() { // tests if B and B' moves work (specifically tests the column shifts)
		rubiksCube = new Board();
		rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveB();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
		rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime();
		assertTrue(BoardChecks.IsSolved(rubiksCube));
	}
	@Test
	public void BackMovesTest2() { // tests if B and B' moves work
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2)); // if this one has an error its a problem with seeding
		rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveB();
		//rubiksCube.PrintBoard();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveBPrime(); rubiksCube.MoveBPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
		rubiksCube.MoveB(); rubiksCube.MoveB(); rubiksCube.MoveB();
		rubiksCube2.MoveBPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
	
	@Test
	public void MovesTest1() {
		rubiksCube = new Board(21312);
		Board rubiksCube2 = new Board(21312);
		rubiksCube.MoveB(); rubiksCube.MoveR(); rubiksCube.MoveF();
		rubiksCube.MoveFPrime(); rubiksCube.MoveRPrime(); rubiksCube.MoveBPrime();
		assertTrue(BoardChecks.BoardsMatch(rubiksCube, rubiksCube2));
	}
}
