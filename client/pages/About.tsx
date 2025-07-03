import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Heart, Info, HelpCircle, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calculator
              </Button>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              About Conception Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about how our conception calculator works and get
              answers to frequently asked questions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">
                    Conception Date Calculation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We calculate your estimated conception date by subtracting
                    266 days (38 weeks) from your birth date. This is based on
                    the average human gestation period.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">
                    Holiday Detection
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We check for major holidays within 5 days of your birthday
                    to see if you were born around special occasions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 mb-2">
                    Celebrity Birthdays
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our database includes famous people, historical figures, and
                    celebrities to find who shares your exact birthday.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">
                    No Data Storage
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We don't store your birth date or any personal information.
                    All calculations happen in your browser.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">
                    Client-Side Processing
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your data never leaves your device. Everything is processed
                    locally for maximum privacy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">
                    Open Source
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our calculations are transparent and can be reviewed by
                    anyone interested in the methodology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-purple-500" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Get answers to common questions about conception calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="accuracy">
                  <AccordionTrigger>
                    How accurate is the conception date?
                  </AccordionTrigger>
                  <AccordionContent>
                    The conception date is an estimate based on the average
                    pregnancy length of 38 weeks (266 days). Individual
                    pregnancies can vary significantly, ranging from 37-42
                    weeks. Factors like premature birth, late delivery, or
                    irregular ovulation cycles can affect accuracy.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="calculation">
                  <AccordionTrigger>
                    What calculation method do you use?
                  </AccordionTrigger>
                  <AccordionContent>
                    We subtract 266 days (38 weeks) from your birth date. This
                    is based on the medical definition of a full-term pregnancy
                    being 40 weeks from the last menstrual period, which is
                    typically 2 weeks before conception.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="holidays">
                  <AccordionTrigger>
                    Which holidays do you check for?
                  </AccordionTrigger>
                  <AccordionContent>
                    We check for major national, religious, and cultural
                    holidays including New Year's Day, Valentine's Day,
                    Independence Day, Halloween, Christmas, and many others. We
                    look for holidays within 5 days of your birthday.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="celebrities">
                  <AccordionTrigger>
                    How do you determine celebrity birthdays?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our database includes famous people from various fields:
                    actors, musicians, politicians, scientists, athletes, and
                    historical figures. We match exact birth dates (month and
                    day) regardless of the year.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacy">
                  <AccordionTrigger>
                    Is my birth date stored anywhere?
                  </AccordionTrigger>
                  <AccordionContent>
                    No, we don't store any personal information. All
                    calculations happen in your browser using JavaScript, and
                    your birth date is never sent to our servers or stored in
                    any database.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="share">
                  <AccordionTrigger>Can I share my results?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can share your results on social media or save them
                    as an image. When you share, only the calculated results are
                    shared, not your original birth date.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/">
              <Button size="lg" className="shadow-lg">
                <Calendar className="h-5 w-5 mr-2" />
                Try the Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
