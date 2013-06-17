class ButtonsController < ApplicationController
  # GET /buttons
  # GET /buttons.json
  def index
    @buttons = Button.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @buttons }
    end
  end

  # GET /buttons/1
  # GET /buttons/1.json
  def show
    @button = Button.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @button }
    end
  end

  # GET /buttons/new
  # GET /buttons/new.json
  def new
    @button = Button.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @button }
    end
  end

  # GET /buttons/1/edit
  def edit
    @button = Button.find(params[:id])
  end

  # POST /buttons
  # POST /buttons.json
  def create
    @button = Button.new(params[:button])

    respond_to do |format|
      if @button.save
        format.html { redirect_to @button, notice: 'Button was successfully created.' }
        format.json { render json: @button, status: :created, location: @button }
      else
        format.html { render action: "new" }
        format.json { render json: @button.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /buttons/1
  # PUT /buttons/1.json
  def update
    @button = Button.find(params[:id])

    respond_to do |format|
      if @button.update_attributes(params[:button])
        format.html { redirect_to @button, notice: 'Button was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @button.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /buttons/1
  # DELETE /buttons/1.json
  def destroy
    @button = Button.find(params[:id])
    @button.destroy

    respond_to do |format|
      format.html { redirect_to buttons_url }
      format.json { head :no_content }
    end
  end
end
