package behaviour;

public class ColorHelper {
	public static int toInt(Color color) {
		switch (color) {
			case YELLOW:
				return 0;
			case WHITE:
				return 1;
			case RED:
				return 2;
			case BLUE:
				return 3;
			case ORANGE:
				return 4;
			case GREEN:
				return 5;
			default:
				System.out.println("ERROR when converting color to int.");
				return -1;
		}
	}
}