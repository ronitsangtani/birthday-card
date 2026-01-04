import java.util.*;
// Flight Booking System
class FlightBooking extends HotelManagementSystem
{
    Payment p = new Payment();
    Scanner sc = new Scanner(System.in);
    double flightPrice;

    void booking()
    {
        System.out.println("ENTER A FLIGHT YOU WANT TO TRAVEL. CHOOSE A NUMBER BETWEEN 1 TO 3:");
        System.out.println("1) VISTARA\n2) INDIGO\n3) AIR INDIA");
        int flightChoice = sc.nextInt();

        System.out.println("ENTER THE DATE YOU WANT TO BOOK:");
        int day = sc.nextInt();
        System.out.println("ENTER THE MONTH:");
        int month = sc.nextInt();

        while(validDate(day, month))
        {
            System.out.println("INVALID DATE! PLEASE ENTER A VALID DATE AND  MONTH~.");
            day = sc.nextInt();
            month = sc.nextInt();
        }

        System.out.println("CHOOSE YOUR DESTINATION:");
        System.out.println("1) MALDIVES - 60,000 RUPEES\n2) DUBAI - 80,000 RUPEES\n3) INDONESIA - 70,000 RUPEES");
        int destinationChoice = sc.nextInt();

        switch (destinationChoice)
        {
            case 1:
                flightPrice = 60000;
                break;
            case 2:
                flightPrice = 80000;
                break;
            case 3:
                flightPrice = 70000;
                break;
            default:
                System.out.println("INVALID DESTINATION CHOICE.");
                return;
        }
        System.out.println("FLIGHT BOOKING SUCCESSFUL! TOTAL COST: " + flightPrice + " RUPEES.");
        // Prompt for payment
        System.out.println("Select payment method: 1) Credit Card 2) Debit Card ");
        int paymentChoice = sc.nextInt();
        String paymentMethod = "";
        switch (paymentChoice)
        {
            case 1:
                paymentMethod = "Credit Card";
                System.out.println("Payment method : " + paymentMethod);
                Payment.CreditCard c = p.new CreditCard();
                c.validateCardDetails(flightPrice);
                break;
            case 2:
                paymentMethod = "Debit Card";
                System.out.println("Payment method : " + paymentMethod);
                Payment.Debitcard dc =p.new Debitcard();
                dc.validateCardDetails(flightPrice);
                break;
            default:
                System.out.println("Invalid payment method.");
                return;
        }
    }
}

// Hotel Management System
class HotelManagementSystem
{
    static String[] rooms = new String[100];
    static String[] customers = new String[100];
    boolean dateValidation;

    static void initializeRooms()
    {
        Arrays.fill(rooms, "Available");
    }

    public static void viewRooms()
    {
        System.out.println("\nRoom Status (Available: 1, Booked: 0)");
        for (int i = 0; i < 100; i++) {
            System.out.print("Room " + (i + 1) + ": " + (rooms[i].equals("Available") ? "1" : "0") + "  ");
            if ((i + 1) % 10 == 0) System.out.println();
        }
    }

    public static void bookRoom(String firstCustomerName, Scanner sc)
    {
        System.out.print("\nEnter room number to book (1-100): ");
        int roomNumber = sc.nextInt();
        sc.nextLine();

        if (roomNumber < 1 || roomNumber > 100 || !rooms[roomNumber - 1].equals("Available"))
        {
            System.out.println("Invalid room number or already booked.");
            return;
        }

        rooms[roomNumber - 1] = "Booked";
        customers[roomNumber - 1] = firstCustomerName;
        System.out.println("Room " + roomNumber + " booked successfully by " + firstCustomerName);
    }

    static void checkIn()
    {
        System.out.println("\nWELCOME TO HOTEL GALAXY! YOU HAVE CHECKED INTO A LUXURY ROOM.");
    }

    public static void checkout(Scanner sc)
    {
        System.out.print("\nEnter room number to checkout (1-100): ");
        int roomNumber = sc.nextInt();

        if (roomNumber < 1 || roomNumber > 100 || rooms[roomNumber - 1].equals("Available"))
        {
            System.out.println("Invalid room number or room is already vacant.");
            return;
        }

        System.out.println("Room " + roomNumber + " is now available. Goodbye, " + customers[roomNumber - 1] + "!");
        rooms[roomNumber - 1] = "Available";
        customers[roomNumber - 1] = null;
    }

    boolean validDate(int day, int month)
    {
        int[] daysInMonth = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

        if (month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1])
        {
            dateValidation = false;
        }
        else
        {
            dateValidation= true;
        }
        return dateValidation;
    }
}

// Customer Class
class Customer
{
    private final String customerId;
    private final String name;
    private final long contact;
    private final String email;

    public Customer(String customerId, String name, long contact, String email)
    {
        this.customerId = customerId;
        this.name = name;
        this.contact = contact;
        this.email = email;
    }

    public String getCustomerId()	{return customerId; }
    public String getName() { return name; }
    public long getContact() { return contact; }
    public String getEmail() { return email; }
}

// Trip Package System
class TripPackage
{
    String destination;
    int duration;
    double pricePerPerson;

    TripPackage(String destination, int duration, double pricePerPerson)
    {
        this.destination = destination;
        this.duration = duration;
        this.pricePerPerson = pricePerPerson;
    }

    void displayPackage()
    {
        System.out.println("Destination: " + destination);
        System.out.println("Duration: " + duration + " Days");
        System.out.println("Price per person: " + pricePerPerson + " RUPEES");
    }

    double calculatePrice(int numTravellers)
    {
        return numTravellers * pricePerPerson;
    }
}

// Trip Planner
class TripPlanner
{
    Payment p = new Payment();
    int choice;
    double totalPrice;

    final TripPackage[] tripPackages = {
            new TripPackage("Kashmir", 5, 10000),
            new TripPackage("Jaisalmer", 5, 6000),
            new TripPackage("Sikkim", 3, 8000),
            new TripPackage("Goa", 7, 12000)
    };

    void bookPackage(Scanner sc, int numTravellers)
    {
        System.out.println("Available Trip Packages:");
        for (int i = 0; i < tripPackages.length; i++)
        {
            System.out.println((i + 1) + " . " + tripPackages[i].destination + " for " + tripPackages[i].duration + " days and price per person is " + tripPackages[i].pricePerPerson);
        }

        System.out.println("Enter the package number you want to book: ");
        System.out.println("Press 5 for exit");
        choice = sc.nextInt();

        if (choice < 1 || choice > tripPackages.length && choice != 5)
        {
            System.out.println("Invalid package number. Please try again.");
            return;
        }
        switch(choice)
        {
            case 1 :
                System.out.println();
                System.out.println("Booking for " + numTravellers + " travellers:");
                tripPackages[choice - 1].displayPackage();
                totalPrice = tripPackages[choice - 1].calculatePrice(numTravellers);
                System.out.println("Total cost: " + totalPrice + " RUPEES.");
                break;

            case 2 :
                System.out.println();
                System.out.println("Booking for " + numTravellers + " travellers:");
                tripPackages[choice - 1].displayPackage();
                totalPrice = tripPackages[choice - 1].calculatePrice(numTravellers);
                System.out.println("Total cost: " + totalPrice + " RUPEES.");
                break;

            case 3 :
                System.out.println("Booking for " + numTravellers + " travellers:");
                tripPackages[choice - 1].displayPackage();
                totalPrice = tripPackages[choice - 1].calculatePrice(numTravellers);
                System.out.println("Total cost: " + totalPrice + " RUPEES.");
                break;

            case 4 :
                System.out.println();
                System.out.println("Booking for " + numTravellers + " travellers:");
                tripPackages[choice - 1].displayPackage();
                totalPrice = tripPackages[choice - 1].calculatePrice(numTravellers);
                System.out.println("Total cost: " + totalPrice + " RUPEES.");
                break;

            case 5 :
                System.out.println("THANK YOU FOR USING OUR FACILITY!!");
                break;

            default : System.out.println("Enter your choice");
        }
        // Prompt for payment
        System.out.println("Select payment method: 1) Credit Card 2) Debit Card ");
        int paymentChoice = sc.nextInt();
        String paymentMethod = "";
        switch (paymentChoice)
        {
            case 1:
                paymentMethod = "Credit Card";
                Payment.CreditCard c = p.new CreditCard();
                c.validateCardDetails(totalPrice);
                break;
            case 2:
                paymentMethod = "Debit Card";
                Payment.Debitcard dc =p.new Debitcard();
                dc.validateCardDetails(totalPrice);
                break;
            default:
                System.out.println("Invalid payment method.");
                return;
        }
    }
}

class Payment
{
    private String accountNumber;
    private String formattedAccountNumber;
    private String cardHolderName;
    private String expDate;
    private String cvv;
    double pay;
    double amounttoPay;

    class Debitcard extends Payment
    {
        void validateCardDetails(double amount)
        {
            amounttoPay = amount;
            int month = 0;
            int year = 0;
            Scanner sc = new Scanner(System.in);
            System.out.println("Enter your First Name : ");
            String firstName = sc.nextLine();
            System.out.println("Enter your Last Name : ");
            String lastName = sc.nextLine();
            cardHolderName = firstName.toUpperCase() + " " + lastName.toUpperCase();
            while(true)
            {
                System.out.println("Enter your card number (must be 16 digits)");
                accountNumber = sc.nextLine();
                if(accountNumber.length() == 16)
                {
                    if(accountNumber.charAt(0) > '0' && accountNumber.charAt(0) < '9')
                    {
                        while(true)
                        {
                            System.out.println("Enter your cvv (must be 3 digits)");
                            cvv = sc.next();
                            if(cvv.length() == 3)
                            {
                                System.out.println("Valid account number");
                                formattedAccountNumber = accountNumber.substring(0, 4) + " " + accountNumber.substring(4, 8) + " " + accountNumber.substring(8, 12) + " " + accountNumber.substring(12);
                                break;
                            }
                            else
                            {
                                System.out.println("Invalid cvv, please enter a 3 digit number");
                            }
                        }
                        break;
                    }
                    else
                    {
                        System.out.println("Invalid account number");
                    }
                }
                else
                {
                    System.out.println("Please enter a valid account number");
                }
            }
            while(true)
            {
                System.out.println("Enter your card expiry month : ");
                month = sc.nextInt();
                if(month > 12 || month < 0)
                {
                    System.out.println("Invalid month, please enter a number between 1 and 12");
                }
                else
                {
                    break;
                }
            }
            while(true)
            {
                System.out.println("Enter your card expiry year : ");
                year = sc.nextInt();
                if(year < 2025 || year > 2099)
                {
                    System.out.println("Invalid year, please enter a valid year < 2099");
                }
                else
                {
                    break;
                }
            }
            expDate = month + "/" + year;
            display();
            while(true)
            {
                System.out.println("You have to pay "+amounttoPay+" Rs.");
                System.out.println("Enter your payment amount");
                pay = sc.nextDouble();
                if(pay != amounttoPay)
                {
                    System.out.println("Please enter a valid amount");
                }
                else
                {
                    System.out.println("--------------------------------------------------------");
                    System.out.println("Payment Successful for "+cardHolderName+" of Rs. "+pay);
                    System.out.println("--------------------------------------------------------");
                    break;
                }
            }
        }
        void display()
        {
            System.out.println();
            System.out.println("");
            System.out.println("Your card Details ");
            System.out.println("-> Account Number      : "+formattedAccountNumber);
            System.out.println("-> Account Name        : "+cardHolderName);
            System.out.println("-> Account expiration  : "+expDate);
            System.out.println("");
            System.out.println();
        }
    }
    //Credit card
    class CreditCard extends Payment
    {
        double pay;
        double amounttoPay;
        Scanner sc = new Scanner(System.in);
        void validateCardDetails(double amount)
        {
            amounttoPay = amount;
            int month = 0;
            int year = 0;
            System.out.println("Enter your First Name : ");
            String firstName = sc.nextLine();
            System.out.println("Enter your Last Name : ");
            String lastName = sc.nextLine();
            cardHolderName = firstName.toUpperCase() + " " + lastName.toUpperCase();
            while(true)
            {
                System.out.println("Enter your card number (must be 16 digits)");
                accountNumber = sc.nextLine();
                if(accountNumber.length() == 16)
                {
                    if(accountNumber.charAt(0) > '0' && accountNumber.charAt(0) < '9')
                    {
                        while(true)
                        {
                            System.out.println("Enter your cvv (must be 3 digits)");
                            cvv = sc.next();
                            if(cvv.length() == 3)
                            {
                                System.out.println("Valid account number");
                                formattedAccountNumber = accountNumber.substring(0, 4) + " " + accountNumber.substring(4, 8) + " " + accountNumber.substring(8, 12) + " " + accountNumber.substring(12);
                                break;
                            }
                            else
                            {
                                System.out.println("Invalid cvv, please enter a 3 digit number");
                            }
                        }
                        break;
                    }
                    else
                    {
                        System.out.println("Invalid account number");
                    }
                }
                else
                {
                    System.out.println("Please enter a valid account number");
                }
            }
            while(true)
            {
                System.out.println("Enter your card expiry month : ");
                month = sc.nextInt();
                if(month > 12 || month < 0)
                {
                    System.out.println("Invalid month, please enter a number between 1 and 12");
                }
                else
                {
                    break;
                }
            }
            while(true)
            {
                System.out.println("Enter your card expiry year : ");
                year = sc.nextInt();
                if(year < 2025 || year > 2099)
                {
                    System.out.println("Invalid year, please enter a valid year < 2099");
                }
                else
                {
                    break;
                }
            }
            expDate = month + "/" + year;
            display();
            while(true)
            {
                System.out.println("You have to pay "+amounttoPay+" Rs.");
                System.out.println("Enter your payment amount");
                pay = sc.nextDouble();
                if(pay != amounttoPay)
                {
                    System.out.println("Please enter a valid amount");
                }
                else
                {
                    System.out.println("--------------------------------------------------------");
                    System.out.println("~ Payment Successful for "+cardHolderName+" of Rs. "+pay);
                    System.out.println("---------------------------------------------------------");
                    break;
                }
            }
        }
        void display()
        {
            System.out.println();
            System.out.println("");
            System.out.println("Your card Details ");
            System.out.println("-> Account Number      : "+formattedAccountNumber);
            System.out.println("-> Account Name        : "+cardHolderName);
            System.out.println("-> Account expiration  : "+expDate);
            System.out.println("");
            System.out.println();
        }
    }
}

// Main Class
class Main
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        HotelManagementSystem.initializeRooms();

        Customer[] customers = new Customer[100];
        String firstCustomerName = "";

        while (true)
        {
            System.out.println("\n--- WELCOME TO PDPA TRAVEL AGENCY ---");
            System.out.println("1) Customer Registration\n2) View Customer Details\n3) Book a Flight\n4) Hotel Accommodation\n5) Book a Trip Package\n6) Exit");
            System.out.println("Enter your choice: ");
            switch (sc.nextInt())
            {
                case 1:
                    // Customer Registration
                    System.out.print("ENTER NO. OF PASSENGERS: ");
                    int passengers = sc.nextInt();
                    sc.nextLine(); // consume newline

                    for (int i = 0; i < passengers; i++)
                    {
                        System.out.println("\nEnter details for Customer " + (i + 1) + ":");

                        System.out.print("Enter first name: ");
                        String fn = sc.next();

                        System.out.print("Enter last name: ");
                        String ln = sc.next();
                        String name = fn.toUpperCase() + " " + ln.toUpperCase();

                        String check_no;
                        while (true)
                        {
                            System.out.print("Enter 10-digit contact number: ");
                            check_no = sc.next();

                            if (check_no.length() == 10 && check_no.matches("\\d{10}"))
                            {
                                break;
                            }
                            else
                            {
                                System.out.println("INVALID CONTACT NUMBER! Must be exactly 10 digits.");
                            }
                        }
                        long contact = Long.parseLong(check_no);

                        String customerId = fn.toLowerCase() + "_" + check_no.substring(6);
                        System.out.print("Enter the email (Note : Only enter your name , special characters or Numbers): ");
                        String email = sc.next(); // Added Gmail here

                        customers[i] = new Customer(customerId, name, contact, email);
                        if (i == 0)
                        {
                            firstCustomerName = name; // Store the first customer name
                        }
                    }
                    break;

                case 2:
                    // View Customer Details
                    System.out.println("\nCustomer List:");
                    for (Customer customer : customers)
                    {
                        if (customer != null)
                        {
                            System.out.println("\n ID: " + customer.getCustomerId() +
                                    "\n Name: " + customer.getName() +
                                    "\n Contact: " + customer.getContact() +
                                    "\n Email: " + customer.getEmail()+"@gmail.com");
                        }
                    }
                    break;

                case 3:
                    System.out.print("ENTER NO. OF TICKETS: ");
                    int tickets = sc.nextInt();

                    for (int i = 0; i < tickets; i++)
                    {
                        System.out.println("\nEnter details for Customer " + (i + 1) + ":");

                        System.out.print("Enter first name: ");
                        String fn = sc.next();

                        System.out.print("Enter last name: ");
                        String ln = sc.next();
                        String name = fn.toUpperCase() + " " + ln.toUpperCase();

                        String check_no;
                        while (true)
                        {
                            System.out.print("Enter 10-digit contact number: ");
                            check_no = sc.next();

                            if (check_no.length() == 10 && check_no.matches("\\d{10}"))
                            {
                                break;
                            }
                            else
                            {
                                System.out.println("INVALID CONTACT NUMBER! Must be exactly 10 digits.");
                            }
                        }
                        long contact = Long.parseLong(check_no);

                        String customerId = fn.toLowerCase() + "_" + check_no.substring(6);
                        System.out.print("Enter the email (Note : Only enter your name , special characters or Numbers): ");
                        String email = sc.next(); // Added Gmail here

                        customers[i] = new Customer(customerId, name, contact, email);
                        if (i == 0)
                        {
                            firstCustomerName = name; // Store the first customer name
                        }
                    }

                    new FlightBooking().booking();
                    break;

                case 4:
                    System.out.print("HOW MANY PERSONS YOU ARE FOR REGISTRATION~: ");
                    int persons = sc.nextInt();
                    for (int i = 0; i < persons; i++)
                    {
                        System.out.println("\nEnter details for Customer " + (i + 1) + ":");

                        System.out.print("Enter first name: ");
                        String fn = sc.next();

                        System.out.print("Enter last name: ");
                        String ln = sc.nextLine();
                        String name = fn + " " + ln;

                        String check_no;
                        while (true)
                        {
                            System.out.print("Enter 10-digit contact number: ");
                            check_no = sc.next();

                            if (check_no.length() == 10 && check_no.matches("\\d{10}"))
                            {
                                break;
                            }
                            else
                            {
                                System.out.println("INVALID CONTACT NUMBER! Must be exactly 10 digits.");
                            }
                        }
                        long contact = Long.parseLong(check_no);

                        String customerId = fn.toLowerCase() + "_" + check_no.substring(6);
                        System.out.print("Enter the email (Note : Only enter your name , special characters or Numbers): ");
                        String email = sc.next(); // Added Gmail here

                        customers[i] = new Customer(customerId, name, contact, email);
                        if (i == 0)
                        {
                            firstCustomerName = name; // Store the first customer name
                        }
                    }
                    boolean b=true;
                    while(b)
                    {
                        System.out.println("1) View Rooms\n2) Book a Room\n3) Check-In\n4) Checkout \n5)Exit.");
                        int hotelChoice = sc.nextInt();
                        switch (hotelChoice) {
                            case 1:
                                HotelManagementSystem.viewRooms();
                                break;
                            case 2:
                                HotelManagementSystem.bookRoom(firstCustomerName, sc);
                                break;
                            case 3:
                                HotelManagementSystem.checkIn();
                                break;
                            case 4:
                                HotelManagementSystem.checkout(sc);
                                break;
                            case 5:
                                b=false;
                                break;
                            default:
                                System.out.println("Invalid choice. Please try again.");
                                break;
                        }
                    }
                    break;

                case 5:
                    System.out.print("Enter number of travellers: ");
                    int travellers = sc.nextInt();
                    for (int i = 0; i < travellers; i++)
                    {
                        System.out.println("\nEnter details for Customer " + (i + 1) + ":");

                        System.out.print("Enter first name: ");
                        String fn = sc.next();

                        System.out.print("Enter last name: ");
                        String ln = sc.next();
                        String name = fn.toUpperCase() + " " + ln.toUpperCase();

                        String check_no;
                        while (true)
                        {
                            System.out.print("Enter 10-digit contact number: ");
                            check_no = sc.next();

                            if (check_no.length() == 10 && check_no.matches("\\d{10}"))
                            {
                                break;
                            }
                            else
                            {
                                System.out.println("INVALID CONTACT NUMBER! Must be exactly 10 digits.");
                            }
                        }
                        long contact = Long.parseLong(check_no);

                        String customerId = fn.toLowerCase() + "_" + check_no.substring(6);
                        System.out.print("Enter the email(Note : Only enter your name , special characters or Numbers): ");
                        String email = sc.next(); // Added Gmail here

                        customers[i] = new Customer(customerId, name, contact, email);
                        if (i == 0)
                        {
                            firstCustomerName = name; // Store the first customer name
                        }
                    }
                    new TripPlanner().bookPackage(sc, travellers);
                    break;

                case 6:
                    System.out.println("Thank you for visiting! Have a great day.");
                    return;

                default:
                    System.out.println("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}
