package scientificCalculator;

//import java.util.Scanner;

public class CalculatorUserInput {
	protected String firstOperand;
	protected String secondOperand;
	protected String operation;
	protected String result;
	protected String resultStorage;
	//protected Scanner userInput;
	protected CalculatorOperations calculatorOperations;
	protected String whatIsShownOnScreen; // "firstOperand", "secondOperand", "result"
	
	public CalculatorUserInput() {
		firstOperand = "";
		secondOperand = "";
		operation = "";
		result = "";
		resultStorage = "";
		whatIsShownOnScreen = "firstOperand";
		//userInput = new Scanner(System.in);
		calculatorOperations = new CalculatorOperations();
	}
	
	public void ResetOp() {
		firstOperand = "";
		secondOperand = "";
		operation = "";
		result = "";
		//resultStorage = "";
		whatIsShownOnScreen = "firstOperand";
	}
	
	public void ReadInput(String str) throws InvalidOperationException {
		if (str.equals("")) {
			return;
		}
		
		if (str.equalsIgnoreCase("M+") || str.equalsIgnoreCase("M-") || str.equalsIgnoreCase("M-Recall")) {
			if (str.equalsIgnoreCase("M-Recall")) {
				if (firstOperand.equalsIgnoreCase("")) { // firstOperand is empty
					firstOperand = calculatorOperations.MRecall();
					whatIsShownOnScreen = "firstOperand";
				}
				else if (!firstOperand.equalsIgnoreCase("") && !operation.equalsIgnoreCase("") && secondOperand.equalsIgnoreCase("")) {
					secondOperand = calculatorOperations.MRecall();
					whatIsShownOnScreen = "secondOperand";
				}
				else {
					throw new InvalidOperationException("Error: Invalid Place to Put M-Recall");
				}
			}
			else if (str.equalsIgnoreCase("M+")) {
				//if (whatIsShownOnScreen.equalsIgnoreCase("result")) {
					if (resultStorage.equalsIgnoreCase("")) {
						throw new InvalidOperationException("Error: Cannot Call M+ on Unexecuted Operation");
					}
					calculatorOperations.MPlus(Float.parseFloat(resultStorage));
					//result = String.valueOf(calculatorOperations.MPlus(Float.parseFloat(result)));
				//}
				//throw new InvalidOperationException("Error: Cannot Call M+ on Unexecuted Operation");
			}
			else if (str.equalsIgnoreCase("M-")) {
				//if (whatIsShownOnScreen.equalsIgnoreCase("result")) {
				if (resultStorage.equalsIgnoreCase("")) {
					throw new InvalidOperationException("Error: Cannot Call M- on Unexecuted Operation");
				}
				calculatorOperations.MMinus(Float.parseFloat(resultStorage));
				//result = String.valueOf(calculatorOperations.MPlus(Float.parseFloat(result)));
			//}
			//throw new InvalidOperationException("Error: Cannot Call M+ on Unexecuted Operation");
				
				/*
				if (whatIsShownOnScreen.equalsIgnoreCase("result")) {
					if (result.equalsIgnoreCase("")) {
						throw new InvalidOperationException("Error: Tried to change result but result was empty");
					}
					result = String.valueOf(calculatorOperations.MPlus(Float.parseFloat(result)));
				}
				else if (whatIsShownOnScreen.equalsIgnoreCase("firstOperand")) {
					if (firstOperand.equalsIgnoreCase("")) {
						throw new InvalidOperationException("Error: Tried to change first operand but first operand was empty");
					}
					firstOperand = String.valueOf(calculatorOperations.MPlus(Float.parseFloat(firstOperand)));
				}
				else if (whatIsShownOnScreen.equalsIgnoreCase("secondOperand")) {
					if (secondOperand.equalsIgnoreCase("")) {
						throw new InvalidOperationException("Error: Tried to change second operand but second operand was empty");
					}
					secondOperand = String.valueOf(calculatorOperations.MPlus(Float.parseFloat(secondOperand)));
				}
				else {
					throw new InvalidOperationException("Error: Something Went Wrong with M-");
				}*/
			}
		}
		else if (str.equalsIgnoreCase("M-Clear")) {
			calculatorOperations.MClear();
		}
		else if (str.equalsIgnoreCase("-")) {
			if (operation.equals("")) {
				operation = str;
				whatIsShownOnScreen = "secondOperand";
			}
			else {
				throw new InvalidOperationException("Error: cannot have '-' as an operand");
			}
		}
		else if ((str.equalsIgnoreCase("+") || str.equalsIgnoreCase("*") || str.equalsIgnoreCase("/") || str.equalsIgnoreCase("(Square Root)") || str.equalsIgnoreCase("(Square)"))
				&& !firstOperand.equalsIgnoreCase("")) {
			//if (str.equalsIgnoreCase("(Square Root)") || str.equalsIgnoreCase("(Square)")) {
			operation = str;
			whatIsShownOnScreen = "secondOperand";
			//}
		}
		else if (str.equalsIgnoreCase("=")) {
			if (firstOperand.equalsIgnoreCase("")) {
				throw new InvalidOperationException("Error: No Operand");
			}
			else if ((operation.equalsIgnoreCase("(Square Root)") || operation.equalsIgnoreCase("(Square)")) && !secondOperand.equalsIgnoreCase("")) {
				throw new InvalidOperationException("Error: Square and Square Root cannot handle 2 operands");
			}
			else if (operation.equalsIgnoreCase("(Square Root)")) {
				result = String.valueOf(calculatorOperations.SquareRoot(Float.parseFloat(firstOperand)));
				resultStorage = String.valueOf(calculatorOperations.SquareRoot(Float.parseFloat(firstOperand)));
				whatIsShownOnScreen = "result";
			}
			else if (operation.equalsIgnoreCase("(Square)")) {
				result = String.valueOf(calculatorOperations.Square(Float.parseFloat(firstOperand)));
				resultStorage = String.valueOf(calculatorOperations.Square(Float.parseFloat(firstOperand)));
				whatIsShownOnScreen = "result";
			}
			else if (secondOperand.equalsIgnoreCase("")) {
				throw new InvalidOperationException("Error: requires second operand");
			}
			else if (operation.equals("+")) {
				result = String.valueOf(calculatorOperations.Add(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				resultStorage = String.valueOf(calculatorOperations.Add(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				whatIsShownOnScreen = "result";
			}
			else if (operation.equals("-")) {
				result = String.valueOf(calculatorOperations.Subtract(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				resultStorage = String.valueOf(calculatorOperations.Subtract(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				whatIsShownOnScreen = "result";
			}
			else if (operation.equals("*")) {
				result = String.valueOf(calculatorOperations.Multiply(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				resultStorage = String.valueOf(calculatorOperations.Multiply(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				whatIsShownOnScreen = "result";
			}
			else if (operation.equals("/")) {
				result = String.valueOf(calculatorOperations.Divide(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				resultStorage = String.valueOf(calculatorOperations.Divide(Float.parseFloat(firstOperand), Float.parseFloat(secondOperand)));
				whatIsShownOnScreen = "result";
			}
		}
		else if ((str.equalsIgnoreCase("+") || str.equalsIgnoreCase("*") || str.equalsIgnoreCase("/") || str.equalsIgnoreCase("(Square Root)") || str.equalsIgnoreCase("(Square)")) && (firstOperand.equalsIgnoreCase("") || !operation.equalsIgnoreCase(""))) {
			// invalid operation: no first operand
			throw new InvalidOperationException("Error: No Operand or Operator already exists");
		}
		else if (isNumeric(str)) { // place operand
			if (str.charAt(str.length() - 1) == '.') { // if a value of say: "100." is entered it will transform it to 100.0
				str = str + "0";
			}
			
			
			
			// check for more than 1 '.'
			int count = 0;
			for (int i = 0; i < str.length(); i++) {
				if (str.charAt(i) == '.') {
					count++;
				}
			}
			if (count > 1) {
				throw new InvalidOperationException("Error: more than 1 decimal point in operand");
			}
			
			if (Math.abs(Float.parseFloat(str)) >= Math.sqrt(Float.MAX_VALUE)) { // don't allow infinite values
				throw new InvalidOperationException("Error: Value Too Big");
			}
			
			if (whatIsShownOnScreen.equalsIgnoreCase("firstOperand") && firstOperand.equalsIgnoreCase("")) {
				firstOperand = str;
				return;
			}
			else if (whatIsShownOnScreen.equalsIgnoreCase("firstOperand")) {
				throw new InvalidOperationException("Error: Cannot place operand on top of another operand");
			}
			if (whatIsShownOnScreen.equalsIgnoreCase("secondOperand") && secondOperand.equalsIgnoreCase("")) {
				secondOperand = str;
			}
			else if (whatIsShownOnScreen.equalsIgnoreCase("secondOperand")) {
				throw new InvalidOperationException("Error: Cannot place operand on top of another operand");
			}
			else {
				throw new InvalidOperationException("Error: Something Went Wrong placing Operand");
			}
		}
		else {
			throw new InvalidOperationException("Error: Illegal Input");
		}
	}
	
	public static boolean isNumeric(String str) {
        if (str == null || str.isEmpty()) {
            return false; // If the string is null or empty, it's not a number
        }
        
        try {
            Double.parseDouble(str); // Try to parse the string as a double
            return true; // If parsing succeeds, the string is a number
        } catch (NumberFormatException e) {
            return false; // If parsing fails, the string is not a number
        }
    }
}
