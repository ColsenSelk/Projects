package scientificCalculator;

public class CalculatorOperations {
	
	protected float mem;
	protected boolean memStored;
	protected boolean operationExecuted;
	
	public CalculatorOperations() {
		mem = 0f;
		operationExecuted = false;
		memStored = false;
	}
	
	public float Add(float a, float b) {
		operationExecuted = true;
//		mem = a + b;
//		memStored = true;
		return a + b;
	}
	
	public float Subtract(float a, float b) {
		operationExecuted = true;
//		mem = a - b;
//		memStored = true;
		return a - b;
	}
	
	public float Multiply(float a, float b) {
		operationExecuted = true;
//		mem = a * b;
//		memStored = true;
		return a * b;
	}
	
	public float Divide(float a, float b) throws InvalidOperationException {
		if (b == 0) {
			throw new InvalidOperationException("Error: Divide by Zero");
		}
		operationExecuted = true;
//		mem = a / b;
//		memStored = true;
		return a / b;
	}
	
	public float Square(float a) {
		operationExecuted = true;
//		mem = a * a;
//		memStored = true;
		return a * a;
	}
	
	public float SquareRoot(float a) throws InvalidOperationException {
		if (a < 0) {
			throw new InvalidOperationException("Error: This calculator does not handle imaginary numbers");
		}
		operationExecuted = true;
//		mem = (float) Math.sqrt(a);
//		memStored = true;
		return (float) Math.sqrt(a);
	}
	
	public float MPlus(float executedOperation) throws InvalidOperationException { // add the output of a successfully executed and displayed math operation to the value currently stored in its memory (negative values allowed)
		if (!operationExecuted) {
			throw new InvalidOperationException("Error: No Operation Detected"); // no operations have been made yet.
		}
		/*if (!memStored) {
			throw new InvalidOperationException("Error: Nothing in Memory"); // nothing in memory;
		}*/
		mem = mem + executedOperation;
		memStored = true;
		return mem + executedOperation;
	}
	
	public float MMinus(float executedOperation) throws InvalidOperationException { // subtract the number on the calculator screen from the number stored in its memory (negative values allowed)
		if (!operationExecuted) {
			throw new InvalidOperationException("Error: No Operation Detected"); // no operations have been made yet.
		}
		/*if (!memStored) {
			throw new InvalidOperationException("Error: Nothing in Memory"); // nothing in memory;
		}*/
		mem = mem - executedOperation;
		memStored = true;
		return mem - executedOperation;
	}
	
	public String MRecall() throws InvalidOperationException { // recall the number in the memory and use it as an input operand to current calculation
		if (!memStored) {
			throw new InvalidOperationException("Error: Nothing in Memory"); // nothing in memory;
		}
		return String.valueOf(mem);
	}
	
	public void MClear() {
		mem = 0f;
		memStored = false;
	}
	
}
