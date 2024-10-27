package scientificCalculator;

public class InvalidOperationException extends Exception {
	/**
	 * default
	 */
	private static final long serialVersionUID = 1L;
	private String errorMessage;
	public InvalidOperationException(String errorMessage) {
		super(errorMessage);
		this.errorMessage = errorMessage;
	}
	
	public void PrintError() {
		System.out.println(errorMessage);
	}
	
	public String GetError() {
		return errorMessage;
	}

}
