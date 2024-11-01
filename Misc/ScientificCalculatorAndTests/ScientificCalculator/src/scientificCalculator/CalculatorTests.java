package scientificCalculator;

import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CalculatorTests {
	public CalculatorGUI calculatorGUI;
	
	@BeforeEach
	public void create() {
		calculatorGUI = new CalculatorGUI();
	}
	
	@Test
	public void TestOne() { // tests +
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("+");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		assertTrue(calculatorGUI.displayField.getText().equals("4.0"));
	}
	
	@Test
	public void TestTwo() { // tests m+, delete, and m-recall
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("+");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		calculatorGUI.simulateButtonClick("Delete");
		calculatorGUI.simulateButtonClick("Delete");
		calculatorGUI.simulateButtonClick("Delete");
		calculatorGUI.simulateButtonClick("M+");
		calculatorGUI.simulateButtonClick("M+");
		calculatorGUI.simulateButtonClick("M+");
		calculatorGUI.simulateButtonClick("M-");
		calculatorGUI.simulateButtonClick("M-Recall");
		assertTrue(calculatorGUI.displayField.getText().equals("8.0"));
	}
	
	@Test
	public void TestThree() { // testss dividing
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("/");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		assertTrue(calculatorGUI.displayField.getText().equals("1.0"));
	}
	
	@Test
	public void TestFour() { // test invalid square
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("Square");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		assertTrue(calculatorGUI.displayField.getText().contains("Error"));
	}
	
	@Test
	public void TestFive() { // tests square
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("Square");
		//calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		assertTrue(calculatorGUI.displayField.getText().contains("4.0"));
	}
	
	@Test
	public void TestSix() { // tests decimal points, square root, m+ and mclear and mrecall, and delete
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("Square Root");
		//calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		assertTrue(calculatorGUI.displayField.getText().contains("1.4"));
		calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");
		assertTrue(calculatorGUI.displayField.getText().equals(""));
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick(".");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("/");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick(".");
		calculatorGUI.simulateButtonClick("2");
		calculatorGUI.simulateButtonClick("=");
		assertTrue(calculatorGUI.displayField.getText().contains("1.0"));
		calculatorGUI.simulateButtonClick("M+");
		calculatorGUI.simulateButtonClick("M+");
		calculatorGUI.simulateButtonClick("M-Recall");
		assertTrue(calculatorGUI.displayField.getText().equals("2.0"));
		calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");calculatorGUI.simulateButtonClick("Delete");
		calculatorGUI.simulateButtonClick("M-Clear");
		calculatorGUI.simulateButtonClick("M-Recall");
		assertTrue(calculatorGUI.displayField.getText().contains("Error"));
		
	}

}
