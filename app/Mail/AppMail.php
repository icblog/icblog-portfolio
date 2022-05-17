<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;


class AppMail extends Mailable
{
    use Queueable, SerializesModels;
    
    public $subject;
    protected $emailTemplate;
    public $dataObj;

    /**
     * Create a new message instance.
     *
     * @return void
     */


    public function __construct($subject,$emailTemplate, $dataObj){
        $this->subject = $subject;
        $this->emailTemplate = $emailTemplate;
        $this->dataObj = $dataObj;
        
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(){
        return $this->subject($this->subject)->view($this->emailTemplate);
    }
  
}
